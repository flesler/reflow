I need to complete a job interview technical assessment.
First explain the exercise requirements, then I'll share code samples from my previous projects so you can match my coding style and patterns.

--

The assessment.md file contains my summary, so please skip reading it to avoid redundancy.

--

I'll implement a class-based solution with a `bin/simulate.ts` CLI script that loads data and executes the algorithm. Please review the codebase in `./reference-api` (my most recent project) to extract:
- Library choices and versions
- Coding style and conventions
- Design patterns and architectural decisions
- Test patterns (same libraries, config files, and array-based test structure)

Also review the MDC rules: /typescript /query_graphql /tdd

Then update assessment.md with:
- Concise project requirements
- All coding standards
- Library choices
- Reference file paths for each category

--

Add a reference to the original requirements document at `@naologic/docs/BE-technical-test.md` (no need to read it). Include any other useful information that would be helpful, but keep it concise, avoid unnecessary verbosity.

--

Please include a plan for sample data generation: Should we manually create test data, or use a library like Faker to generate random data following the schema?

--

Let's proceed with project setup. Update package.json with:
- All required scripts
- Dependencies and devDependencies
- Use the latest versions of everything
- Match the patterns from reference-api

Additionally:
- Create `bin/install-npm.ts` script that accepts package names as arguments, queries npm for latest versions, and installs them (automatically detecting and installing @types/* packages as devDependencies)
- Copy over key configuration files from reference-api: tsconfig files and bin/ handling approach

--

Install all dependencies, including @types/node matching the .nvmrc version. Then use the bin script to update each package to its latest version.

--

Set me as the author in package.json.

--

Remove the test:watch and test:watch:file scripts from package.json, and remove the FILE feature from the vitest configuration.

--

Remove the test:verbose script from package.json.

--

Switch the ts script in package.json to use tsx instead of ts-node, and update the corresponding dependencies.

--

The `bin/install-npm.ts` script needs to support an optional `--dev` flag as the second argument to install packages as devDependencies.

--

Create `bin/add-scenarios.ts <amount>` script that generates random sample data. The script should add scenarios to the data file. Question: Do the requirements specify JSON format, or can we use TypeScript files? I prefer `src/data/*.ts` files for strong typing.

--

Confirming the architecture: Is the data static (no database)? How are requests handled, server or CLI script? The assessment.md contains my summary, so skip reading it to avoid redundancy.

--

Should we use a single data file? The script should import existing data, push() the new scenario, and write the file back.

--

The eslint,-fix command must run twice. Create a function for this and call it twice.

--

In `bin/add-scenarios.ts` lines 140-142: Move all imports to the top of the file. Avoid dynamic imports in the middle of functions.

--

I prefer importing at the top of the file for strong typing rather than dynamic imports within functions.

--

In `src/data/scenarios.ts` lines 13-14: The dates are inconsistent, one is UTC and the other isn't. Ensure all dates are in UTC ISO format.

--

Verify that `bin/add-scenarios.ts` line 139 doesn't need a scenarioName variable at all.

--

Assess whether the Scenario type wrapper is necessary, or if we should just export the three arrays directly. Review the requirements to determine if scenarios are needed.

--

Confirming behavior: Each script execution adds a new scenario to the array (not appending to flat arrays within a scenario), correct? Also, should we have multiple scenarios for this test or just one? If we're adding scenarios, rename the script to `add-scenarios` and update all references.

--

Run the linter to check for any issues.

--

Run the add-scenarios script again to verify it works correctly.

--

Preparing for handoff to a new conversation. Please:
1. Verify that the TypeScript types match the specifications exactly
2. Update the assessment markdown with any missing information needed for a new agent to start from scratch

The new agent will begin fresh, reading only the assessment document.

--


Review the assessment markdown and technical test requirements. Check the code implementation against the requirements and verify correctness by running `npm run simulate`. Identify any issues or failures.

--

Analyze the algorithm implementation: verify correctness, assess if the approach is sound, and evaluate if it can be simplified or made more readable.

--

Evaluate the unit test coverage for the scheduling logic. Assess whether the existing tests adequately cover the core algorithm behavior and identify any gaps.

--

Add comprehensive unit tests for the scheduling algorithm, focusing on edge cases: work center conflict resolution, maintenance window handling, dependency constraints, and circular dependency detection.

--

Perform a final review: verify the implementation is complete, all tests pass, and the solution is ready for submission to the technical assessment.

--

Identify any remaining improvements that can be easily implemented. Provide implementation guidelines but do not write the code.

--

Add unit tests for overnight shift support. Ensure the tests initially fail to verify the current implementation doesn't support this feature, then provide implementation guidance.

--

Verify the date-utils implementation after adding overnight shift support. Confirm all tests pass and the functionality works correctly.

--
