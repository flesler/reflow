import { faker } from '@faker-js/faker'
import { execSync } from 'child_process'
import fs from 'fs'
import { DateTime } from 'luxon'
import path from 'path'
import { scenarios as existingScenarios } from 'src/data/scenarios'
import type { ManufacturingOrder, Scenario, WorkCenter, WorkOrder } from 'src/reflow/types'
import * as dateUtils from 'src/utils/date-utils'

// Format: $ npm run ts -- bin/add-scenarios.ts <workOrders> [scenarios] [--wipe]
// Example: $ npm run ts -- bin/add-scenarios.ts 10 3 --wipe

function generateWorkCenter(id: string, name: string): WorkCenter {
  const shifts: WorkCenter['data']['shifts'] = [
    { dayOfWeek: 1, startHour: 8, endHour: 17 },
    { dayOfWeek: 2, startHour: 8, endHour: 17 },
    { dayOfWeek: 3, startHour: 8, endHour: 17 },
    { dayOfWeek: 4, startHour: 8, endHour: 17 },
    { dayOfWeek: 5, startHour: 8, endHour: 17 },
  ]

  const maintenanceWindows: WorkCenter['data']['maintenanceWindows'] = []
  if (faker.datatype.boolean({ probability: 0.3 })) {
    const start = DateTime.utc().plus({ days: faker.number.int({ min: 1, max: 30 }) }).startOf('day').plus({ hours: faker.number.int({ min: 0, max: 12 }) })
    const end = start.plus({ hours: faker.number.int({ min: 2, max: 8 }) })
    maintenanceWindows.push({
      startDate: start.toUTC().toISO()!,
      endDate: end.toUTC().toISO()!,
      reason: faker.helpers.arrayElement(['Scheduled maintenance', 'Equipment repair', 'Safety inspection']),
    })
  }

  return {
    docId: id,
    docType: 'workCenter',
    data: {
      name,
      shifts,
      maintenanceWindows,
    },
  }
}

function generateManufacturingOrder(id: string): ManufacturingOrder {
  const dueDate = DateTime.utc().plus({ days: faker.number.int({ min: 7, max: 60 }) }).toUTC().toISO()!

  return {
    docId: id,
    docType: 'manufacturingOrder',
    data: {
      manufacturingOrderNumber: `MO-${faker.string.alphanumeric(8).toUpperCase()}`,
      itemId: `ITEM-${faker.string.alphanumeric(6).toUpperCase()}`,
      quantity: faker.number.int({ min: 10, max: 1000 }),
      dueDate,
    },
  }
}

function generateWorkOrder(
  id: string,
  workCenterId: string,
  manufacturingOrderId: string,
  existingWorkOrderIds: string[],
  existingWorkOrders: WorkOrder[],
  workCenter: WorkCenter,
): WorkOrder {
  const isMaintenance = faker.datatype.boolean({ probability: 0.1 })
  const durationMinutes = faker.number.int({ min: 30, max: 480 })
  let startDate = DateTime.utc().plus({ days: faker.number.int({ min: 0, max: 14 }) }).startOf('hour')
  if (!dateUtils.isWithinAnyShift(startDate, workCenter.data.shifts)) {
    startDate = dateUtils.getNextShiftStart(startDate, workCenter.data.shifts)
  }
  let endDate = dateUtils.calculateEndDateWithShifts(startDate, durationMinutes, workCenter.data.shifts)

  if (isMaintenance) {
    const maxAttempts = 50
    let attempts = 0
    while (attempts < maxAttempts) {
      const interval = { start: startDate, end: endDate }
      const overlapsMaintenance = existingWorkOrders.some((wo) => {
        if (!wo.data.isMaintenance || wo.data.workCenterId !== workCenterId) {
          return false
        }
        return dateUtils.overlaps(interval, {
          start: dateUtils.iso(wo.data.startDate),
          end: dateUtils.iso(wo.data.endDate),
        })
      })
      if (!overlapsMaintenance) {
        break
      }
      const latestEnd = existingWorkOrders.reduce((latest, wo) => {
        if (!wo.data.isMaintenance || wo.data.workCenterId !== workCenterId) {
          return latest
        }
        const woEnd = dateUtils.iso(wo.data.endDate)
        return woEnd > latest ? woEnd : latest
      }, DateTime.fromMillis(0, { zone: 'utc' }))
      startDate = dateUtils.getNextShiftStart(latestEnd, workCenter.data.shifts)
      endDate = dateUtils.calculateEndDateWithShifts(startDate, durationMinutes, workCenter.data.shifts)
      attempts++
    }
    if (attempts >= maxAttempts) {
      throw new Error(`Could not place maintenance work order for work center ${workCenterId} without overlap`)
    }
  }

  const startDateStr = startDate.toUTC().toISO()!
  const endDateStr = endDate.toUTC().toISO()!

  const dependsOnWorkOrderIds: string[] = []
  if (!isMaintenance && existingWorkOrderIds.length > 0 && faker.datatype.boolean({ probability: 0.4 })) {
    const numDeps = faker.number.int({ min: 1, max: Math.min(3, existingWorkOrderIds.length) })
    const selected = faker.helpers.arrayElements(existingWorkOrderIds, numDeps)
    dependsOnWorkOrderIds.push(...selected)
  }

  return {
    docId: id,
    docType: 'workOrder',
    data: {
      workOrderNumber: `WO-${faker.string.alphanumeric(8).toUpperCase()}`,
      manufacturingOrderId,
      workCenterId,
      startDate: startDateStr,
      endDate: endDateStr,
      durationMinutes,
      isMaintenance,
      dependsOnWorkOrderIds,
    },
  }
}

function generateScenario(orders: number): Scenario {
  const workCenters: WorkCenter[] = []
  const workCenterIds: string[] = []
  const numWorkCenters = faker.number.int({ min: 2, max: 5 })

  for (let i = 0; i < numWorkCenters; i++) {
    const id = `wc-${faker.string.alphanumeric(8)}`
    workCenterIds.push(id)
    workCenters.push(generateWorkCenter(id, `Work Center ${i + 1}`))
  }

  const manufacturingOrders: ManufacturingOrder[] = []
  const manufacturingOrderIds: string[] = []
  const numManufacturingOrders = faker.number.int({ min: orders, max: orders * 2 })

  for (let i = 0; i < numManufacturingOrders; i++) {
    const id = `mo-${faker.string.alphanumeric(8)}`
    manufacturingOrderIds.push(id)
    manufacturingOrders.push(generateManufacturingOrder(id))
  }

  const workOrders: WorkOrder[] = []
  const workOrderIds: string[] = []

  for (let i = 0; i < orders; i++) {
    const id = `wo-${faker.string.alphanumeric(8)}`
    workOrderIds.push(id)
    const workCenterId = faker.helpers.arrayElement(workCenterIds)
    const workCenter = workCenters.find(wc => wc.docId === workCenterId)!
    const manufacturingOrderId = faker.helpers.arrayElement(manufacturingOrderIds)
    workOrders.push(generateWorkOrder(id, workCenterId, manufacturingOrderId, workOrderIds.slice(0, -1), workOrders, workCenter))
  }

  return {
    workOrders,
    workCenters,
    manufacturingOrders,
  }
}

function main() {
  const args = process.argv.slice(2)
  const workOrders = Number.parseInt(args[0], 10) ?? 10
  const numScenarios = Number.parseInt(args[1], 10) ?? 1
  const shouldWipe = args[2] === '--wipe'

  if (!workOrders || workOrders < 1) {
    console.error('Usage: npm run ts -- bin/add-scenarios.ts <workOrders> [scenarios] [--wipe]')
    console.error('  workOrders: number of work orders to generate per scenario (default: 10)')
    console.error('  scenarios: number of scenarios to generate (default: 1)')
    console.error('  --wipe: wipe existing scenarios before adding new ones')
    process.exit(1)
  }

  if (!numScenarios || numScenarios < 1) {
    console.error('Error: number of scenarios must be at least 1')
    process.exit(1)
  }

  const scenarios: Scenario[] = []
  for (let i = 0; i < numScenarios; i++) {
    const scenario = generateScenario(workOrders)
    scenarios.push(scenario)
    console.log(`Generated scenario ${i + 1}/${numScenarios} with:`)
    console.log(`  - ${scenario.workOrders.length} work orders`)
    console.log(`  - ${scenario.workCenters.length} work centers`)
    console.log(`  - ${scenario.manufacturingOrders.length} manufacturing orders`)
  }

  const filePath = path.join(__dirname, '../src/data/scenarios.ts')

  const allScenarios = shouldWipe ? scenarios : [...existingScenarios, ...scenarios]

  const scenariosArray = allScenarios.map(s => JSON.stringify(s, null, 2)).join(',\n\n  ')

  const finalContent = `import type { Scenario } from 'src/reflow/types'

export const scenarios: Scenario[] = [
  ${scenariosArray},
]
`

  fs.writeFileSync(filePath, finalContent, 'utf8')
  console.log(`\n${shouldWipe ? 'Replaced' : 'Added'} ${numScenarios} scenario(s) to ${filePath}`)

  function runEslintFix() {
    try {
      execSync(`npm run eslint -- ${filePath} --fix`, { stdio: 'inherit' })
    } catch {
      // eslint might fail, but that's ok
    }
  }

  console.log('Linting the data file...')
  runEslintFix()
  runEslintFix()
}

main()
