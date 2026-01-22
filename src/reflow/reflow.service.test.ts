import { toModule } from 'src/utils/tests'
import type { Scenario } from 'src/reflow/types'
import { describe, expect, it } from 'vitest'
import { ReflowService } from './reflow.service'

describe(toModule(__filename), () => {
  describe('reflow', () => {
    it('should handle simple scenario without changes', () => {
      const scenario: Scenario = {
        workOrders: [
          {
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
          },
        ],
        workCenters: [
          {
            docId: 'wc-1',
            docType: 'workCenter',
            data: {
              name: 'Line 1',
              shifts: [
                { dayOfWeek: 1, startHour: 8, endHour: 17 },
              ],
              maintenanceWindows: [],
            },
          },
        ],
        manufacturingOrders: [
          {
            docId: 'mo-1',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-001',
              itemId: 'ITEM-A',
              quantity: 100,
              dueDate: '2024-01-20T00:00:00.000Z',
            },
          },
        ],
      }

      const service = new ReflowService()
      const result = service.reflow(scenario)

      expect(result.updatedWorkOrders.length).toBe(1)
      expect(result.changes.length).toBe(0)
      expect(result.explanation).toContain('No changes needed')
    })

    it('should handle dependency chain', () => {
      const scenario: Scenario = {
        workOrders: [
          {
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
          },
          {
            docId: 'wo-2',
            docType: 'workOrder',
            data: {
              workOrderNumber: 'WO-002',
              manufacturingOrderId: 'mo-2',
              workCenterId: 'wc-1',
              startDate: '2024-01-15T09:00:00.000Z',
              endDate: '2024-01-15T12:00:00.000Z',
              durationMinutes: 180,
              isMaintenance: false,
              dependsOnWorkOrderIds: ['wo-1'],
            },
          },
        ],
        workCenters: [
          {
            docId: 'wc-1',
            docType: 'workCenter',
            data: {
              name: 'Line 1',
              shifts: [
                { dayOfWeek: 1, startHour: 8, endHour: 17 },
              ],
              maintenanceWindows: [],
            },
          },
        ],
        manufacturingOrders: [
          {
            docId: 'mo-1',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-001',
              itemId: 'ITEM-A',
              quantity: 100,
              dueDate: '2024-01-20T00:00:00.000Z',
            },
          },
          {
            docId: 'mo-2',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-002',
              itemId: 'ITEM-B',
              quantity: 200,
              dueDate: '2024-01-21T00:00:00.000Z',
            },
          },
        ],
      }

      const service = new ReflowService()
      const result = service.reflow(scenario)

      expect(result.updatedWorkOrders.length).toBe(2)
      const wo2 = result.updatedWorkOrders.find(wo => wo.docId === 'wo-2')!
      const wo1 = result.updatedWorkOrders.find(wo => wo.docId === 'wo-1')!
      const wo1End = new Date(wo1.data.endDate)
      const wo2Start = new Date(wo2.data.startDate)
      expect(wo2Start.getTime()).toBeGreaterThanOrEqual(wo1End.getTime())
    })

    it('should not reschedule maintenance orders', () => {
      const scenario: Scenario = {
        workOrders: [
          {
            docId: 'wo-1',
            docType: 'workOrder',
            data: {
              workOrderNumber: 'WO-001',
              manufacturingOrderId: 'mo-1',
              workCenterId: 'wc-1',
              startDate: '2024-01-15T10:00:00.000Z',
              endDate: '2024-01-15T12:00:00.000Z',
              durationMinutes: 120,
              isMaintenance: true,
              dependsOnWorkOrderIds: [],
            },
          },
        ],
        workCenters: [
          {
            docId: 'wc-1',
            docType: 'workCenter',
            data: {
              name: 'Line 1',
              shifts: [
                { dayOfWeek: 1, startHour: 8, endHour: 17 },
              ],
              maintenanceWindows: [],
            },
          },
        ],
        manufacturingOrders: [
          {
            docId: 'mo-1',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-001',
              itemId: 'ITEM-A',
              quantity: 100,
              dueDate: '2024-01-20T00:00:00.000Z',
            },
          },
        ],
      }

      const service = new ReflowService()
      const result = service.reflow(scenario)

      expect(result.updatedWorkOrders.length).toBe(1)
      const wo = result.updatedWorkOrders[0]
      expect(wo.data.startDate).toBe('2024-01-15T10:00:00.000Z')
      expect(wo.data.endDate).toBe('2024-01-15T12:00:00.000Z')
      expect(result.changes.length).toBe(0)
    })

    it('should handle shift boundaries', () => {
      const scenario: Scenario = {
        workOrders: [
          {
            docId: 'wo-1',
            docType: 'workOrder',
            data: {
              workOrderNumber: 'WO-001',
              manufacturingOrderId: 'mo-1',
              workCenterId: 'wc-1',
              startDate: '2024-01-15T16:00:00.000Z',
              endDate: '2024-01-15T18:00:00.000Z',
              durationMinutes: 120,
              isMaintenance: false,
              dependsOnWorkOrderIds: [],
            },
          },
        ],
        workCenters: [
          {
            docId: 'wc-1',
            docType: 'workCenter',
            data: {
              name: 'Line 1',
              shifts: [
                { dayOfWeek: 1, startHour: 8, endHour: 17 },
                { dayOfWeek: 2, startHour: 8, endHour: 17 },
              ],
              maintenanceWindows: [],
            },
          },
        ],
        manufacturingOrders: [
          {
            docId: 'mo-1',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-001',
              itemId: 'ITEM-A',
              quantity: 100,
              dueDate: '2024-01-20T00:00:00.000Z',
            },
          },
        ],
      }

      const service = new ReflowService()
      const result = service.reflow(scenario)

      expect(result.updatedWorkOrders.length).toBe(1)
      const wo = result.updatedWorkOrders[0]
      const endDate = new Date(wo.data.endDate)
      expect(endDate.getUTCDate()).toBeGreaterThanOrEqual(16)
    })

    it('should resolve work center conflicts in order', () => {
      const scenario: Scenario = {
        workOrders: [
          {
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
          },
          {
            docId: 'wo-2',
            docType: 'workOrder',
            data: {
              workOrderNumber: 'WO-002',
              manufacturingOrderId: 'mo-2',
              workCenterId: 'wc-1',
              startDate: '2024-01-15T09:00:00.000Z',
              endDate: '2024-01-15T11:00:00.000Z',
              durationMinutes: 120,
              isMaintenance: false,
              dependsOnWorkOrderIds: [],
            },
          },
        ],
        workCenters: [
          {
            docId: 'wc-1',
            docType: 'workCenter',
            data: {
              name: 'Line 1',
              shifts: [
                { dayOfWeek: 1, startHour: 8, endHour: 17 },
              ],
              maintenanceWindows: [],
            },
          },
        ],
        manufacturingOrders: [
          {
            docId: 'mo-1',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-001',
              itemId: 'ITEM-A',
              quantity: 100,
              dueDate: '2024-01-20T00:00:00.000Z',
            },
          },
          {
            docId: 'mo-2',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-002',
              itemId: 'ITEM-B',
              quantity: 200,
              dueDate: '2024-01-21T00:00:00.000Z',
            },
          },
        ],
      }

      const service = new ReflowService()
      const result = service.reflow(scenario)
      const wo2 = result.updatedWorkOrders.find(wo => wo.docId === 'wo-2')!

      expect(wo2.data.startDate).toBe('2024-01-15T10:00:00.000Z')
      expect(wo2.data.endDate).toBe('2024-01-15T12:00:00.000Z')
    })

    it('should push work orders that overlap maintenance working time', () => {
      const scenario: Scenario = {
        workOrders: [
          {
            docId: 'wo-1',
            docType: 'workOrder',
            data: {
              workOrderNumber: 'WO-001',
              manufacturingOrderId: 'mo-1',
              workCenterId: 'wc-1',
              startDate: '2024-01-15T08:00:00.000Z',
              endDate: '2024-01-15T11:00:00.000Z',
              durationMinutes: 180,
              isMaintenance: false,
              dependsOnWorkOrderIds: [],
            },
          },
        ],
        workCenters: [
          {
            docId: 'wc-1',
            docType: 'workCenter',
            data: {
              name: 'Line 1',
              shifts: [
                { dayOfWeek: 1, startHour: 8, endHour: 17 },
              ],
              maintenanceWindows: [
                {
                  startDate: '2024-01-15T09:00:00.000Z',
                  endDate: '2024-01-15T10:00:00.000Z',
                  reason: 'Calibration',
                },
              ],
            },
          },
        ],
        manufacturingOrders: [
          {
            docId: 'mo-1',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-001',
              itemId: 'ITEM-A',
              quantity: 100,
              dueDate: '2024-01-20T00:00:00.000Z',
            },
          },
        ],
      }

      const service = new ReflowService()
      const result = service.reflow(scenario)
      const wo = result.updatedWorkOrders[0]

      expect(wo.data.startDate).toBe('2024-01-15T10:00:00.000Z')
      expect(wo.data.endDate).toBe('2024-01-15T13:00:00.000Z')
    })

    it('should allow maintenance overlap outside working hours', () => {
      const scenario: Scenario = {
        workOrders: [
          {
            docId: 'wo-1',
            docType: 'workOrder',
            data: {
              workOrderNumber: 'WO-001',
              manufacturingOrderId: 'mo-1',
              workCenterId: 'wc-1',
              startDate: '2024-01-15T16:00:00.000Z',
              endDate: '2024-01-16T09:00:00.000Z',
              durationMinutes: 120,
              isMaintenance: false,
              dependsOnWorkOrderIds: [],
            },
          },
        ],
        workCenters: [
          {
            docId: 'wc-1',
            docType: 'workCenter',
            data: {
              name: 'Line 1',
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
          },
        ],
        manufacturingOrders: [
          {
            docId: 'mo-1',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-001',
              itemId: 'ITEM-A',
              quantity: 100,
              dueDate: '2024-01-20T00:00:00.000Z',
            },
          },
        ],
      }

      const service = new ReflowService()
      const result = service.reflow(scenario)
      const wo = result.updatedWorkOrders[0]

      expect(wo.data.startDate).toBe('2024-01-15T16:00:00.000Z')
      expect(wo.data.endDate).toBe('2024-01-16T09:00:00.000Z')
    })

    it('should not move work orders earlier than original start', () => {
      const scenario: Scenario = {
        workOrders: [
          {
            docId: 'wo-1',
            docType: 'workOrder',
            data: {
              workOrderNumber: 'WO-001',
              manufacturingOrderId: 'mo-1',
              workCenterId: 'wc-1',
              startDate: '2024-01-15T08:00:00.000Z',
              endDate: '2024-01-15T09:00:00.000Z',
              durationMinutes: 60,
              isMaintenance: false,
              dependsOnWorkOrderIds: [],
            },
          },
          {
            docId: 'wo-2',
            docType: 'workOrder',
            data: {
              workOrderNumber: 'WO-002',
              manufacturingOrderId: 'mo-2',
              workCenterId: 'wc-1',
              startDate: '2024-01-15T13:00:00.000Z',
              endDate: '2024-01-15T14:00:00.000Z',
              durationMinutes: 60,
              isMaintenance: false,
              dependsOnWorkOrderIds: ['wo-1'],
            },
          },
        ],
        workCenters: [
          {
            docId: 'wc-1',
            docType: 'workCenter',
            data: {
              name: 'Line 1',
              shifts: [
                { dayOfWeek: 1, startHour: 8, endHour: 17 },
              ],
              maintenanceWindows: [],
            },
          },
        ],
        manufacturingOrders: [
          {
            docId: 'mo-1',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-001',
              itemId: 'ITEM-A',
              quantity: 100,
              dueDate: '2024-01-20T00:00:00.000Z',
            },
          },
          {
            docId: 'mo-2',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-002',
              itemId: 'ITEM-B',
              quantity: 200,
              dueDate: '2024-01-21T00:00:00.000Z',
            },
          },
        ],
      }

      const service = new ReflowService()
      const result = service.reflow(scenario)
      const wo2 = result.updatedWorkOrders.find(wo => wo.docId === 'wo-2')!

      expect(wo2.data.startDate).toBe('2024-01-15T13:00:00.000Z')
      expect(wo2.data.endDate).toBe('2024-01-15T14:00:00.000Z')
    })

    it('should throw on circular dependencies', () => {
      const scenario: Scenario = {
        workOrders: [
          {
            docId: 'wo-1',
            docType: 'workOrder',
            data: {
              workOrderNumber: 'WO-001',
              manufacturingOrderId: 'mo-1',
              workCenterId: 'wc-1',
              startDate: '2024-01-15T08:00:00.000Z',
              endDate: '2024-01-15T09:00:00.000Z',
              durationMinutes: 60,
              isMaintenance: false,
              dependsOnWorkOrderIds: ['wo-2'],
            },
          },
          {
            docId: 'wo-2',
            docType: 'workOrder',
            data: {
              workOrderNumber: 'WO-002',
              manufacturingOrderId: 'mo-2',
              workCenterId: 'wc-1',
              startDate: '2024-01-15T09:00:00.000Z',
              endDate: '2024-01-15T10:00:00.000Z',
              durationMinutes: 60,
              isMaintenance: false,
              dependsOnWorkOrderIds: ['wo-1'],
            },
          },
        ],
        workCenters: [
          {
            docId: 'wc-1',
            docType: 'workCenter',
            data: {
              name: 'Line 1',
              shifts: [
                { dayOfWeek: 1, startHour: 8, endHour: 17 },
              ],
              maintenanceWindows: [],
            },
          },
        ],
        manufacturingOrders: [
          {
            docId: 'mo-1',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-001',
              itemId: 'ITEM-A',
              quantity: 100,
              dueDate: '2024-01-20T00:00:00.000Z',
            },
          },
          {
            docId: 'mo-2',
            docType: 'manufacturingOrder',
            data: {
              manufacturingOrderNumber: 'MO-002',
              itemId: 'ITEM-B',
              quantity: 200,
              dueDate: '2024-01-21T00:00:00.000Z',
            },
          },
        ],
      }

      const service = new ReflowService()
      expect(() => service.reflow(scenario)).toThrow('Circular dependency detected')
    })
  })
})
