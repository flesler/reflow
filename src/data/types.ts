export type Document = WorkOrder | WorkCenter | ManufacturingOrder

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
