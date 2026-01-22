import { toModule, type FnTestCase } from 'src/utils/tests'
import type { WorkCenter, WorkOrder } from 'src/reflow/types'
import { describe, expect, it } from 'vitest'
import * as constraintChecker from './constraint-checker'

describe(toModule(__filename), () => {
  describe('validateConstraints', () => {
    const baseWorkCenter: WorkCenter = {
      docId: 'wc-1',
      docType: 'workCenter',
      data: {
        name: 'Line 1',
        shifts: [
          { dayOfWeek: 1, startHour: 8, endHour: 17 },
        ],
        maintenanceWindows: [],
      },
    }

    const baseWorkOrder: WorkOrder = {
      docId: 'wo-1',
      docType: 'workOrder',
      data: {
        workOrderNumber: 'WO-001',
        manufacturingOrderId: 'mo-1',
        workCenterId: 'wc-1',
        startDate: '2024-01-15T08:00:00.000Z',
        endDate: '2024-01-15T10:00:00.000Z',
        durationMinutes: 120,
        isMaintenance: false,
        dependsOnWorkOrderIds: [],
      },
    }

    const cases: FnTestCase<typeof constraintChecker.validateConstraints>[] = [
      {
        desc: 'valid schedule',
        input: [
          [baseWorkOrder],
          [baseWorkCenter],
        ],
        expected: { valid: true, errors: [] },
      },
      {
        desc: 'endDate before startDate',
        input: [
          [{
            ...baseWorkOrder,
            data: {
              ...baseWorkOrder.data,
              endDate: '2024-01-15T07:00:00.000Z',
            },
          }],
          [baseWorkCenter],
        ],
        expected: {
          valid: false,
          errors: expect.arrayContaining([expect.stringContaining('endDate <= startDate')]),
        },
      },
      {
        desc: 'starts outside shift',
        input: [
          [{
            ...baseWorkOrder,
            data: {
              ...baseWorkOrder.data,
              startDate: '2024-01-15T18:00:00.000Z',
            },
          }],
          [baseWorkCenter],
        ],
        expected: {
          valid: false,
          errors: expect.arrayContaining([expect.stringContaining('starts outside shift')]),
        },
      },
      {
        desc: 'dependency violation',
        input: [
          [
            baseWorkOrder,
            {
              ...baseWorkOrder,
              docId: 'wo-2',
              data: {
                ...baseWorkOrder.data,
                workOrderNumber: 'WO-002',
                dependsOnWorkOrderIds: ['wo-1'],
                startDate: '2024-01-15T09:00:00.000Z',
                endDate: '2024-01-15T11:00:00.000Z',
              },
            },
          ],
          [baseWorkCenter],
        ],
        expected: {
          valid: false,
          errors: expect.arrayContaining([expect.stringContaining('starts before dependency')]),
        },
      },
      {
        desc: 'overlapping work orders',
        input: [
          [
            baseWorkOrder,
            {
              ...baseWorkOrder,
              docId: 'wo-2',
              data: {
                ...baseWorkOrder.data,
                workOrderNumber: 'WO-002',
                startDate: '2024-01-15T09:00:00.000Z',
                endDate: '2024-01-15T11:00:00.000Z',
              },
            },
          ],
          [baseWorkCenter],
        ],
        expected: {
          valid: false,
          errors: expect.arrayContaining([expect.stringContaining('overlap')]),
        },
      },
      {
        desc: 'maintenance overlap during working time',
        input: [
          [{
            ...baseWorkOrder,
            data: {
              ...baseWorkOrder.data,
              startDate: '2024-01-15T08:00:00.000Z',
              endDate: '2024-01-15T11:00:00.000Z',
              durationMinutes: 180,
            },
          }],
          [{
            ...baseWorkCenter,
            data: {
              ...baseWorkCenter.data,
              maintenanceWindows: [
                {
                  startDate: '2024-01-15T09:00:00.000Z',
                  endDate: '2024-01-15T10:00:00.000Z',
                  reason: 'Calibration',
                },
              ],
            },
          }],
        ],
        expected: {
          valid: false,
          errors: expect.arrayContaining([expect.stringContaining('maintenance window')]),
        },
      },
      {
        desc: 'maintenance overlap outside working hours',
        input: [
          [{
            ...baseWorkOrder,
            data: {
              ...baseWorkOrder.data,
              startDate: '2024-01-15T16:00:00.000Z',
              endDate: '2024-01-16T09:00:00.000Z',
              durationMinutes: 120,
            },
          }],
          [{
            ...baseWorkCenter,
            data: {
              ...baseWorkCenter.data,
              shifts: [
                { dayOfWeek: 1, startHour: 8, endHour: 17 },
                { dayOfWeek: 2, startHour: 8, endHour: 17 },
              ],
              maintenanceWindows: [
                {
                  startDate: '2024-01-15T18:00:00.000Z',
                  endDate: '2024-01-15T19:00:00.000Z',
                  reason: 'Inspection',
                },
              ],
            },
          }],
        ],
        expected: { valid: true, errors: [] },
      },
    ]

    cases.forEach(({ desc, input, expected }) => {
      it(`should handle ${desc}`, () => {
        const result = constraintChecker.validateConstraints(...input)
        if (!expected) {
          throw new Error('Expected value is required')
        }
        if (expected.valid) {
          expect(result.valid).toBe(true)
          expect(result.errors).toEqual([])
        } else {
          expect(result.valid).toBe(false)
          expect(result.errors.length).toBeGreaterThan(0)
          if (expected.errors && Array.isArray(expected.errors)) {
            for (const expectedError of expected.errors) {
              if (typeof expectedError === 'string') {
                expect(result.errors.some(e => e.includes(expectedError))).toBe(true)
              } else {
                expect(result.errors).toEqual(expect.arrayContaining([expectedError]))
              }
            }
          }
        }
      })
    })
  })
})
