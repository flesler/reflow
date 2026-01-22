# Production Schedule Reflow

A production schedule reflow system for manufacturing facilities that intelligently reschedules work orders when disruptions occur, respecting dependencies, shift boundaries, maintenance windows, and work center constraints.

## Setup

### Prerequisites

- Node.js `^24.11.1` (see `.nvmrc`)
- npm `^11.0.0`

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) If using nvm, use the correct Node version:
   ```bash
   nvm use
   ```

## Usage

### Running the Simulation

Run the simulation on all scenarios in `src/data/scenarios.ts`:

```bash
npm run simulate
```

Or use the start script:

```bash
npm start
```

The simulation will:
- Load all scenarios from `src/data/scenarios.ts`
- Run the reflow algorithm on each scenario
- Display results including rescheduled work orders and changes

### Adding Scenarios

Generate new random scenarios using the `add-scenarios` script:

```bash
npm run ts -- bin/add-scenarios.ts <workOrdersPerScenario> [numberOfScenarios] [--wipe]
```

**Parameters:**
- `workOrdersPerScenario`: Number of work orders to generate per scenario (required)
- `numberOfScenarios`: Number of scenarios to generate (optional, default: 1)
- `--wipe`: Wipe existing scenarios before adding new ones (optional)

**Examples:**

```bash
# Generate 1 scenario with 10 work orders (appends to existing scenarios)
npm run ts -- bin/add-scenarios.ts 10

# Generate 3 scenarios with 10 work orders each (appends to existing scenarios)
npm run ts -- bin/add-scenarios.ts 10 3

# Wipe existing scenarios and generate 2 new scenarios with 15 work orders each
npm run ts -- bin/add-scenarios.ts 15 2 --wipe
```

The script will:
- Generate random work orders, work centers, and manufacturing orders
- Ensure work orders respect shift boundaries
- Add scenarios to `src/data/scenarios.ts`
- Auto-format the file with ESLint

## Testing

Run all tests:

```bash
npm test
```

Run unit tests only:

```bash
npm run test:unit
```

Run type checking:

```bash
npm run test:types
```

## Project Structure

```
src/
├── data/
│   ├── types.ts              # TypeScript type definitions
│   └── scenarios.ts          # Scenario data (work orders, work centers, manufacturing orders)
├── reflow/
│   ├── reflow.service.ts     # Main reflow algorithm
│   └── constraint-checker.ts # Constraint validation
└── util/
    ├── date.ts               # Date/shift utilities (Luxon)
    ├── tests.ts              # Test utilities
    └── index.ts              # Utility exports
bin/
├── simulate.ts               # CLI script to run simulations
└── add-scenarios.ts          # CLI script to generate scenarios
```

## How It Works

The reflow algorithm:

1. **Topological Sort**: Orders work orders by dependencies
2. **Pre-populate Maintenance**: Adds all maintenance orders to schedules (they can't be moved)
3. **Reschedule**: For each non-maintenance work order:
   - Finds earliest start time after dependencies complete
   - Adjusts to shift boundaries
   - Finds available slot avoiding:
     - Other work orders on same work center
     - Maintenance windows
     - Shift boundaries
4. **Validate**: Ensures final schedule respects all constraints

**Constraints:**
- Work orders take full `durationMinutes` to complete
- Work pauses outside shift hours, resumes in next shift
- No work during maintenance windows
- All dependencies must complete before dependent work starts
- Only one order at a time per work center
- Maintenance orders cannot be rescheduled

## License

MIT
