import { DateTime } from 'luxon'
import { toModule, type FnTestCase } from 'src/utils/tests'
import * as dateUtils from 'src/utils/date-utils'
import { describe, expect, it } from 'vitest'

describe(toModule(__filename), () => {
  describe('isWithinShift', () => {
    const cases: FnTestCase<typeof dateUtils.isWithinShift>[] = [
      {
        desc: 'within shift hours',
        input: [DateTime.utc(2024, 1, 15, 10, 0), { dayOfWeek: 1, startHour: 8, endHour: 17 }],
        expected: true,
      },
      {
        desc: 'before shift start',
        input: [DateTime.utc(2024, 1, 15, 7, 0), { dayOfWeek: 1, startHour: 8, endHour: 17 }],
        expected: false,
      },
      {
        desc: 'after shift end',
        input: [DateTime.utc(2024, 1, 15, 18, 0), { dayOfWeek: 1, startHour: 8, endHour: 17 }],
        expected: false,
      },
      {
        desc: 'wrong day of week',
        input: [DateTime.utc(2024, 1, 16, 10, 0), { dayOfWeek: 1, startHour: 8, endHour: 17 }],
        expected: false,
      },
      {
        desc: 'at shift start',
        input: [DateTime.utc(2024, 1, 15, 8, 0), { dayOfWeek: 1, startHour: 8, endHour: 17 }],
        expected: true,
      },
      {
        desc: 'at shift end boundary',
        input: [DateTime.utc(2024, 1, 15, 17, 0), { dayOfWeek: 1, startHour: 8, endHour: 17 }],
        expected: false,
      },
    ]

    cases.forEach(({ desc, input, expected }) => {
      it(`should handle ${desc}`, () => {
        expect(dateUtils.isWithinShift(...input)).toBe(expected)
      })
    })
  })

  describe('isWithinAnyShift', () => {
    const shifts = [
      { dayOfWeek: 1, startHour: 8, endHour: 17 },
      { dayOfWeek: 2, startHour: 8, endHour: 17 },
    ]

    const cases: FnTestCase<typeof dateUtils.isWithinAnyShift>[] = [
      {
        desc: 'within first shift',
        input: [DateTime.utc(2024, 1, 15, 10, 0), shifts],
        expected: true,
      },
      {
        desc: 'within second shift',
        input: [DateTime.utc(2024, 1, 16, 10, 0), shifts],
        expected: true,
      },
      {
        desc: 'outside all shifts',
        input: [DateTime.utc(2024, 1, 17, 10, 0), shifts],
        expected: false,
      },
    ]

    cases.forEach(({ desc, input, expected }) => {
      it(`should handle ${desc}`, () => {
        expect(dateUtils.isWithinAnyShift(...input)).toBe(expected)
      })
    })
  })

  describe('calculateEndDateWithShifts', () => {
    const shifts = [
      { dayOfWeek: 1, startHour: 8, endHour: 17 },
      { dayOfWeek: 2, startHour: 8, endHour: 17 },
    ]

    const cases: FnTestCase<typeof dateUtils.calculateEndDateWithShifts>[] = [
      {
        desc: 'simple case within shift',
        input: ['2024-01-15T08:00:00.000Z', 120, shifts],
        expected: '2024-01-15T10:00:00.000Z',
      },
      {
        desc: 'spans shift boundary',
        input: ['2024-01-15T16:00:00.000Z', 120, shifts],
        expected: '2024-01-16T09:00:00.000Z',
      },
      {
        desc: 'starts outside shift',
        input: ['2024-01-15T18:00:00.000Z', 120, shifts],
        expected: '2024-01-16T10:00:00.000Z',
      },
    ]

    cases.forEach(({ desc, input, expected }) => {
      it(`should handle ${desc}`, () => {
        if (!expected) {
          throw new Error('Expected value is required')
        }
        const result = dateUtils.calculateEndDateWithShifts(...input)
        if (!result) {
          throw new Error('calculateEndDateWithShifts returned undefined')
        }
        const resultDate = DateTime.fromISO(result, { zone: 'utc' })
        const expectedDate = DateTime.fromISO(expected, { zone: 'utc' })
        expect(resultDate.toMillis()).toBe(expectedDate.toMillis())
      })
    })
  })
})
