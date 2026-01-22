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
- Input: Work orders, work centers (machines), manufacturing orders
- Output: Valid schedule with updated dates, list of changes, explanation
- Rules:
  - Work orders take full `durationMinutes` to complete
  - Work pauses outside shift hours, resumes in next shift
  - No work during maintenance windows
  - All dependencies must complete before dependent work starts
- Error handling: Throw error explaining which constraints cannot be satisfied if no valid solution exists
- Dates: All dates in ISO string format (UTC)

### Hard Constraints
- Work Center: One order at a time per machine, respect shifts, no work during maintenance
- Dependencies: Multiple parents allowed (all must complete first), can form chains
- Time: Work only during shift hours, maintenance windows cannot be changed, maintenance orders cannot be rescheduled

### Deliverables
- ✅ Working algorithm (TypeScript class/service)
- ✅ CLI script (`bin/simulate.ts`) that loads JSON and runs algorithm
- ✅ Sample data (3+ scenarios in JSON files)
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
- ts-node (for running bin scripts)

### Project Structure
```
src/
├── reflow/
│   ├── reflow.service.ts          # Main algorithm class
│   ├── constraint-checker.ts      # Validation logic
│   └── types.ts                   # TypeScript types
├── util/
│   ├── date-utils.ts              # Date helpers (Luxon)
│   └── tests.ts                   # Test utilities
bin/
└── simulate.ts                    # CLI script that loads JSON and runs
data/
└── scenarios/                    # JSON files with sample data
```

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
  import { toModule, type FnTestCase } from 'src/util/tests'
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
- WorkCenter: `name`, `shifts[]` (dayOfWeek 0-6, startHour/endHour 0-23), `maintenanceWindows[]` (startDate/endDate)
- ManufacturingOrder: `manufacturingOrderNumber`, `itemId`, `quantity`, `dueDate`

### Sample Data Generation
- Required scenarios: Hand-craft 3+ JSON files in `data/scenarios/` to test specific edge cases (delay cascade, shift boundaries, maintenance conflicts)
- Optional: Use `@faker-js/faker` for generating additional random scenarios if needed
- Each scenario should be a complete, valid input that demonstrates a specific constraint or combination

### Reference Files
- Original requirements: `BE-technical-test.md`
- Coding style: `~/Code/vetbrain/vetbrain-api/src/util/util.ts`
- Test patterns: `~/Code/vetbrain/vetbrain-api/src/util/util.test.ts`
- Test utilities: `~/Code/vetbrain/vetbrain-api/src/util/tests.ts`
- CLI script: `~/Code/vetbrain/vetbrain-api/bin/generate-id.ts`
- TypeScript config: `~/Code/vetbrain/vetbrain-api/tsconfig.json`
- Vitest config: `~/Code/vetbrain/vetbrain-api/vitest.config.ts`
- ESLint config: `~/Code/vetbrain/vetbrain-api/eslint.config.js`
- Package.json: `~/Code/vetbrain/vetbrain-api/package.json`
