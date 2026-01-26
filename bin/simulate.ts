import { scenarios } from 'src/data/scenarios'
import { ReflowService } from 'src/reflow/reflow.service'

// Format: $ npm run ts -- bin/simulate.ts
// Example: $ npm run ts -- bin/simulate.ts

function main() {
  console.log(`>>> Running reflow simulation on ${scenarios.length} scenario(s)\n`)

  const reflowService = new ReflowService()

  for (let i = 0; i < scenarios.length; i++) {
    const scenario = scenarios[i]
    console.log(`=== Scenario ${i + 1} ===`)
    console.log(`Work Orders: ${scenario.workOrders.length}`)
    console.log(`Work Centers: ${scenario.workCenters.length}`)
    console.log(`Manufacturing Orders: ${scenario.manufacturingOrders.length}\n`)

    try {
      const result = reflowService.reflow(scenario)

      console.log(`Result: ${result.explanation}`)
      console.log(`Changes: ${result.changes.length}`)

      if (result.changes.length > 0) {
        console.log('\nChanges:')
        for (const change of result.changes) {
          console.log(`  - ${change.workOrderNumber}:`)
          console.log(`    Old: ${change.oldStartDate} → ${change.oldEndDate}`)
          console.log(`    New: ${change.newStartDate} → ${change.newEndDate}`)
          console.log(`    Reason: ${change.reason}`)
        }
      }

      console.log(`\nUpdated Work Orders: ${result.updatedWorkOrders.length}`)
    } catch (err) {
      console.error(`Error processing scenario ${i + 1}:`, err.message)
    }

    if (i < scenarios.length - 1) {
      console.log('\n')
    }
  }
}

main()
