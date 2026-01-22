/** Testing utilities for data-driven test patterns - types only, no vitest dependencies */
import { relative } from 'path'

/** Converts __filename (e.g., '/path/to/project/src/util/errors.test.ts') to 'src/util/errors' */
export const toModule = (filename: string): string => {
  return relative(process.cwd(), filename)
    .replace(/\.test\.[tj]s$/, '')
}

/**
 * Base test case structure for data-driven tests
 * @example const cases: TestCase<string, { name: string, email: string }>[] = []
 */
export type TestCase<I = any, O = any> = {
  /** Description of what this test case is testing */
  desc: string
  /** Input to the function being tested */
  input: I
} & (
  /** Expected output from the function */
  | { expected: O; throws?: never }
  /** If it throws, provide the error message and don't expect an output */
  | { throws: string; expected?: never }
)

/**
 * Type helper to create a TestCase from a function signature
 * For multi-arg functions, input must be an array of args (input: [value])
 * For single-arg functions, use input: value
 * If the only arg is optional, use input: [value]
 * @example const cases: FnTestCase<typeof filter.merge>[] = []
 */
export type FnTestCase<Fn extends (...args: any[]) => any> = Parameters<Fn> extends [infer SingleArg] | [infer SingleArg | undefined] ? TestCase<SingleArg, ReturnType<Fn>> : TestCase<Parameters<Fn>, ReturnType<Fn>>

export type FnSingleTestCase<Fn extends (...args: any[]) => any> = TestCase<Parameters<Fn>[0], ReturnType<Fn>>
