## The Production Schedule Reflow Exercise

Original requirements: `BE-technical-test.md`

The Problem: Manufacturing facility with multiple extrusion lines. Work orders scheduled across lines require rescheduling when disruptions occur:
- Work orders run longer than expected
- Machines break down for maintenance
- Work orders have dependencies (Order B can't start until Order A finishes)
- Different machines have different shift schedules
- Some work orders are maintenance tasks that cannot be moved

Your Task: Build a reflow algorithm that reschedules work orders while respecting all constraints.

## Core Requirements

### Algorithm (TypeScript)
- Input: `{ workOrders: WorkOrder[], workCenters: WorkCenter[], manufacturingOrders: ManufacturingOrder[] }`
- Output: `{ updatedWorkOrders: WorkOrder[], changes: Change[], explanation: string }`
- Rules:
  - Work orders take full `durationMinutes` to complete
  - Work pauses outside shift hours, resumes in next shift
  - No work during maintenance windows
  - All dependencies must complete before dependent work starts
- Error handling: Throw error explaining which constraints cannot be satisfied if no valid solution exists
- Dates: All dates in ISO string format (UTC)
- Service: Create `ReflowService` class with `reflow()` method

### Hard Constraints
- Work Center: One order at a time per machine, respect shifts, no work during maintenance
- Dependencies: Multiple parents allowed (all must complete first), can form chains
- Time: Work only during shift hours, maintenance windows cannot be changed, maintenance orders cannot be rescheduled

### Deliverables
- ✅ Working algorithm (TypeScript class/service)
- ✅ CLI script (`bin/simulate.ts`) that loads scenarios from `src/data/scenarios.ts` and runs algorithm
- ✅ Sample data (3+ scenarios in `src/data/scenarios.ts` - TypeScript file, strongly typed)
- ✅ Script (`bin/add-scenarios.ts`) to generate random scenarios: `npm run add-scenarios <workOrderCount>`
- ✅ Automated test suite (Vitest)
- ✅ Loom demo (5-10 min)
- ✅ GitHub repo with README

### Bonus Features
- DAG implementation for dependencies
- Setup time handling
- Additional complex scenarios
- Optimization metrics
- AI prompt documentation

## Evaluation

Algorithm must handle:
- Delay Cascade: One delayed order affects downstream orders
- Shift/Maintenance: Orders spanning shifts or conflicting with maintenance
- Dependencies: Multiple parent dependencies forming chains
- Work Center Conflicts: No overlapping orders on same machine

6-hour timebox: Add `@upgrade` comments on incomplete parts.

---

## Coding Standards & Libraries

### Libraries
- TypeScript (ES2022, strict mode)
- Vitest (testing framework)
- Luxon (date manipulation - required for shift calculations)
- Lodash (utility helpers)
- tsx (for running bin scripts - faster than ts-node)
- @faker-js/faker (for generating random scenarios)

### Project Structure
```
src/
├── data/
│   └── scenarios.ts                # Sample scenarios array (TypeScript, strongly typed)
├── reflow/
│   ├── reflow.service.ts          # Main algorithm class
│   ├── constraint-checker.ts      # Validation logic
│   └── types.ts                   # TypeScript types
└── utils/
    ├── date-utils.ts              # Date helpers (Luxon)
    └── tests.ts                   # Test utilities (toModule, FnTestCase)
bin/
├── simulate.ts                    # CLI script that loads scenarios and runs algorithm
└── add-scenarios.ts               # Script to generate random scenarios
```

**Note**: Spec structure (BE-technical-test.md) takes precedence over user preferences. Date utilities follow spec location: `utils/date-utils.ts`.

### TypeScript Style
- No semicolons
- Imports: Always use `src/...` paths, never relative imports
- Naming: camelCase for variables/functions, concise names when context is clear
- Console logs: Use `console.log('>>>', { value1, value2 })` format
- Functions: Keep focused on single task, prefer native functions over custom
- Comments: Minimal, only when needed. Use `//` above the line, no empty line before comment
- Module structure: Exported things at top, internal helpers at bottom

### Test Patterns
- Co-locate: `.test.ts` files next to source files
- Test name: Use `toModule(__filename)` from `src/util/tests`
- Data-driven: One flat array per function with all cases (valid, errors, edges)
- Type inference: Use `FnTestCase<typeof fn>` for automatic type inference
- Pattern:
  ```typescript
  import { toModule, type FnTestCase } from 'src/utils/tests'
  import { describe, it, expect } from 'vitest'
  
  describe(toModule(__filename), () => {
    describe('functionName', () => {
      const cases: FnTestCase<typeof functionName>[] = [
        { desc: 'normal case', input: value, expected: result },
        { desc: 'throws when invalid', input: badValue, throws: 'Error message' },
      ]
      
      cases.forEach(({ desc, input, expected, throws }) => {
        it(`should handle ${desc}`, () => {
          if (throws) {
            expect(() => functionName(input)).toThrow(throws)
          } else {
            expect(functionName(input)).toBe(expected)
          }
        })
      })
    })
  })
  ```

### Data Structures
All documents follow: `{ docId: string, docType: string, data: {...} }`
- WorkOrder: `workOrderNumber`, `manufacturingOrderId`, `workCenterId`, `startDate`, `endDate`, `durationMinutes`, `isMaintenance`, `dependsOnWorkOrderIds[]`
- WorkCenter: `name`, `shifts[]` (dayOfWeek 0-6 Sunday=0, startHour/endHour 0-23), `maintenanceWindows[]` (startDate/endDate, reason?)
- ManufacturingOrder: `manufacturingOrderNumber`, `itemId`, `quantity`, `dueDate`
- Scenario: `{ workOrders: WorkOrder[], workCenters: WorkCenter[], manufacturingOrders: ManufacturingOrder[] }`

Types are defined in `src/reflow/types.ts` (per spec). Import: `import type { WorkOrder, WorkCenter, ManufacturingOrder, Scenario } from 'src/reflow/types'`

### Sample Data Generation
- Scenarios stored in `src/data/scenarios.ts` as TypeScript array: `export const scenarios: Scenario[] = [...]`
- Each scenario is a complete test case with all three arrays
- Use `npm run add-scenarios <workOrderCount>` to generate random scenarios
- Required: Hand-craft 3+ scenarios to test specific edge cases:
  1. Delay Cascade: One order delayed → affects downstream orders
  2. Shift/Maintenance: Order spans shifts OR conflicts with maintenance
  3. Complex: Multiple constraints combined
- Script auto-formats with eslint --fix (runs twice)

### Key Implementation Details
- Reflow service interface: `reflow({ workOrders, workCenters, manufacturingOrders })` returns `{ updatedWorkOrders, changes, explanation }`
- simulate.ts: Loads scenarios from `src/data/scenarios.ts`, runs each through reflow service, displays results
- Shift calculation: Use Luxon to handle pause/resume across shift boundaries (work pauses outside shifts, resumes next shift)
- Constraint order: Dependencies → Work Center Conflicts → Shifts → Maintenance
- All dates must be UTC ISO strings (end with 'Z')

### Reference Files
- Original requirements: `BE-technical-test.md`
- Types: `src/data/types.ts`
- Sample scenarios: `src/data/scenarios.ts`
- Coding style: `~/Code/vetbrain/vetbrain-api/src/util/util.ts`
- Test patterns: `~/Code/vetbrain/vetbrain-api/src/util/util.test.ts`
- Test utilities: `~/Code/vetbrain/vetbrain-api/src/util/tests.ts`
- CLI script example: `~/Code/vetbrain/vetbrain-api/bin/generate-id.ts`
- TypeScript config: `~/Code/vetbrain/vetbrain-api/tsconfig.json`
- Vitest config: `~/Code/vetbrain/vetbrain-api/vitest.config.ts`
- ESLint config: `~/Code/vetbrain/vetbrain-api/eslint.config.js`
- Package.json: `~/Code/vetbrain/vetbrain-api/package.json`
