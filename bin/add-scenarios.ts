import { faker } from '@faker-js/faker'
import { execSync } from 'child_process'
import fs from 'fs'
import { DateTime } from 'luxon'
import path from 'path'
import { scenarios as existingScenarios } from 'src/data/scenarios'
import type { ManufacturingOrder, Scenario, WorkCenter, WorkOrder } from 'src/data/types'

function generateWorkCenter(id: string, name: string): WorkCenter {
  const shifts = [
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
): WorkOrder {
  const isMaintenance = faker.datatype.boolean({ probability: 0.1 })
  const durationMinutes = faker.number.int({ min: 30, max: 480 })
  const startDate = DateTime.utc().plus({ days: faker.number.int({ min: 0, max: 14 }) }).startOf('hour').toUTC().toISO()!
  const endDate = DateTime.fromISO(startDate, { zone: 'utc' }).plus({ minutes: durationMinutes }).toUTC().toISO()!

  const dependsOnWorkOrderIds: string[] = []
  if (existingWorkOrderIds.length > 0 && faker.datatype.boolean({ probability: 0.4 })) {
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
      startDate,
      endDate,
      durationMinutes,
      isMaintenance,
      dependsOnWorkOrderIds,
    },
  }
}

function generateScenario(amount: number): Scenario {
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
  const numManufacturingOrders = faker.number.int({ min: amount, max: amount * 2 })

  for (let i = 0; i < numManufacturingOrders; i++) {
    const id = `mo-${faker.string.alphanumeric(8)}`
    manufacturingOrderIds.push(id)
    manufacturingOrders.push(generateManufacturingOrder(id))
  }

  const workOrders: WorkOrder[] = []
  const workOrderIds: string[] = []

  for (let i = 0; i < amount; i++) {
    const id = `wo-${faker.string.alphanumeric(8)}`
    workOrderIds.push(id)
    const workCenterId = faker.helpers.arrayElement(workCenterIds)
    const manufacturingOrderId = faker.helpers.arrayElement(manufacturingOrderIds)
    workOrders.push(generateWorkOrder(id, workCenterId, manufacturingOrderId, workOrderIds.slice(0, -1)))
  }

  return {
    workOrders,
    workCenters,
    manufacturingOrders,
  }
}

function main() {
  const amount = process.argv[2] ? Number.parseInt(process.argv[2], 10) : 10
  if (!amount || amount < 1) {
    console.error('Usage: npm run ts -- bin/add-scenarios.ts <amount>')
    console.error('  amount: number of work orders to generate for this scenario (default: 10)')
    process.exit(1)
  }

  const scenario = generateScenario(amount)

  console.log(`Generated scenario with:`)
  console.log(`  - ${scenario.workOrders.length} work orders`)
  console.log(`  - ${scenario.workCenters.length} work centers`)
  console.log(`  - ${scenario.manufacturingOrders.length} manufacturing orders`)

  const filePath = path.join(__dirname, '../src/data/scenarios.ts')

  // Add new scenario to existing scenarios
  const allScenarios = [...existingScenarios, scenario]

  // Build file content
  const scenariosArray = allScenarios.map(s => JSON.stringify(s, null, 2)).join(',\n\n  ')

  const finalContent = `import type { Scenario } from 'src/data/types'

export const scenarios: Scenario[] = [
  ${scenariosArray},
]
`

  fs.writeFileSync(filePath, finalContent, 'utf8')
  console.log(`\nAdded scenario to ${filePath}`)

  function runEslintFix() {
    try {
      execSync(`npm run eslint -- ${filePath} --fix`, { stdio: 'inherit' })
    } catch {
      // eslint might fail, but that's ok
    }
  }

  // Run eslint --fix twice
  runEslintFix()
  runEslintFix()
}

main()
