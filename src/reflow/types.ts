import type { DateTime } from 'luxon'

export type Document = WorkOrder | WorkCenter | ManufacturingOrder

export type Shift = WorkCenter['data']['shifts'][number]

export type WorkOrder = {
  docId: string
  docType: 'workOrder'
  data: {
    workOrderNumber: string
    manufacturingOrderId: string
    workCenterId: string
    startDate: string
    endDate: string
    durationMinutes: number
    isMaintenance: boolean
    dependsOnWorkOrderIds: string[]
  }
}

export type WorkCenter = {
  docId: string
  docType: 'workCenter'
  data: {
    name: string
    shifts: Array<{
      dayOfWeek: number // 0-6, Sunday = 0
      startHour: number // 0-23
      endHour: number // 0-23
    }>
    maintenanceWindows: Array<{
      startDate: string
      endDate: string
      reason?: string
    }>
  }
}

export type ManufacturingOrder = {
  docId: string
  docType: 'manufacturingOrder'
  data: {
    manufacturingOrderNumber: string
    itemId: string
    quantity: number
    dueDate: string
  }
}

export type Scenario = {
  workOrders: WorkOrder[]
  workCenters: WorkCenter[]
  manufacturingOrders: ManufacturingOrder[]
}

export type Change = {
  workOrderId: string
  workOrderNumber: string
  oldStartDate: string
  newStartDate: string
  oldEndDate: string
  newEndDate: string
  reason: string
}

export type ReflowResult = {
  updatedWorkOrders: WorkOrder[]
  changes: Change[]
  explanation: string
}

export type Interval = {
  start: DateTime
  end: DateTime
}

export type ScheduleInterval = Interval & {
  workOrderId: string
}
