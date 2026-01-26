import type { WorkCenter, WorkOrder } from 'src/reflow/types'
import * as dateUtils from 'src/utils/date-utils'

/** Validates work orders against dependencies, shifts, maintenance, and conflicts. */
export function validateConstraints(
  workOrders: WorkOrder[],
  workCenters: WorkCenter[],
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const workCenterMap = new Map(workCenters.map(wc => [wc.docId, wc]))
  const workOrderMap = new Map(workOrders.map(wo => [wo.docId, wo]))

  for (const wo of workOrders) {
    const workCenter = workCenterMap.get(wo.data.workCenterId)
    if (!workCenter) {
      errors.push(`Work order ${wo.data.workOrderNumber} references unknown work center ${wo.data.workCenterId}`)
      continue
    }

    const startDate = dateUtils.iso(wo.data.startDate)
    const endDate = dateUtils.iso(wo.data.endDate)

    if (endDate <= startDate) {
      errors.push(`Work order ${wo.data.workOrderNumber} has endDate <= startDate`)
      continue
    }

    if (!dateUtils.isWithinAnyShift(startDate, workCenter.data.shifts)) {
      errors.push(`Work order ${wo.data.workOrderNumber} starts outside shift hours`)
    }

    const actualDuration = dateUtils.minutesBetween(wo.data.startDate, wo.data.endDate, workCenter.data.shifts)
    if (Math.abs(actualDuration - wo.data.durationMinutes) > 1) {
      errors.push(`Work order ${wo.data.workOrderNumber} duration mismatch: expected ${wo.data.durationMinutes} minutes, actual ${actualDuration} minutes`)
    }

    for (const depId of wo.data.dependsOnWorkOrderIds) {
      const depWo = workOrderMap.get(depId)
      if (!depWo) {
        errors.push(`Work order ${wo.data.workOrderNumber} depends on unknown work order ${depId}`)
        continue
      }
      const depEndDate = dateUtils.iso(depWo.data.endDate)
      if (startDate < depEndDate) {
        errors.push(`Work order ${wo.data.workOrderNumber} starts before dependency ${depWo.data.workOrderNumber} completes`)
      }
    }

    for (const mw of workCenter.data.maintenanceWindows) {
      const mwStart = dateUtils.iso(mw.startDate)
      const mwEnd = dateUtils.iso(mw.endDate)
      if (dateUtils.hasWorkingTimeOverlapWithMaintenance(startDate, endDate, mwStart, mwEnd, workCenter.data.shifts)) {
        errors.push(`Work order ${wo.data.workOrderNumber} overlaps with maintenance window: ${mw.reason || 'unspecified'}`)
      }
    }
  }

  for (const wc of workCenters) {
    const wosOnCenter = workOrders.filter(wo => wo.data.workCenterId === wc.docId)
    for (let i = 0; i < wosOnCenter.length; i++) {
      for (let j = i + 1; j < wosOnCenter.length; j++) {
        const wo1 = wosOnCenter[i]
        const wo2 = wosOnCenter[j]
        const start1 = dateUtils.iso(wo1.data.startDate)
        const end1 = dateUtils.iso(wo1.data.endDate)
        const start2 = dateUtils.iso(wo2.data.startDate)
        const end2 = dateUtils.iso(wo2.data.endDate)

        if (start1 < end2 && end1 > start2) {
          errors.push(`Work orders ${wo1.data.workOrderNumber} and ${wo2.data.workOrderNumber} overlap on work center ${wc.data.name}`)
        }
      }
    }
  }

  return { valid: errors.length === 0, errors }
}
