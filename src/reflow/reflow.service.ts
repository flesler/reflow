import { DateTime } from 'luxon'
import type { Scenario, WorkCenter, WorkOrder } from 'src/reflow/types'
import { validateConstraints } from 'src/reflow/constraint-checker'
import type { Change, ReflowResult } from 'src/reflow/types'
import * as dateUtils from 'src/utils/date-utils'

export class ReflowService {
  reflow(input: Scenario): ReflowResult {
    const { workOrders, workCenters } = input
    const changes: Change[] = []
    const workCenterMap = new Map(workCenters.map(wc => [wc.docId, wc]))
    const workOrderMap = new Map(workOrders.map(wo => [wo.docId, wo]))

    const sortedWorkOrders = this.topologicalSort(workOrders, workOrderMap)
    const updatedWorkOrders: WorkOrder[] = []
    const workCenterSchedules = new Map<string, Array<{ start: DateTime; end: DateTime; workOrderId: string }>>()

    for (const workCenter of workCenters) {
      workCenterSchedules.set(workCenter.docId, [])
    }

    // Pre-populate schedules with maintenance orders (they can't be moved)
    for (const wo of sortedWorkOrders) {
      if (wo.data.isMaintenance) {
        const startDate = DateTime.fromISO(wo.data.startDate, { zone: 'utc' })
        const endDate = DateTime.fromISO(wo.data.endDate, { zone: 'utc' })
        workCenterSchedules.get(wo.data.workCenterId)!.push({
          start: startDate,
          end: endDate,
          workOrderId: wo.docId,
        })
      }
    }

    for (const wo of sortedWorkOrders) {
      const workCenter = workCenterMap.get(wo.data.workCenterId)!
      const shifts = workCenter.data.shifts

      let newStartDate: DateTime
      let newEndDate: DateTime

      if (wo.data.isMaintenance) {
        newStartDate = DateTime.fromISO(wo.data.startDate, { zone: 'utc' })
        newEndDate = DateTime.fromISO(wo.data.endDate, { zone: 'utc' })
      } else {
        let candidateStart = this.getEarliestDependencyEnd(wo, updatedWorkOrders, workOrderMap)

        candidateStart = this.adjustToShiftStart(candidateStart, shifts)

        candidateStart = this.findAvailableSlot(
          candidateStart,
          wo.data.durationMinutes,
          workCenter,
          workCenterSchedules.get(wo.data.workCenterId)!,
        )

        newStartDate = candidateStart
        const endDateStr = dateUtils.calculateEndDateWithShifts(
          newStartDate.toUTC().toISO()!,
          wo.data.durationMinutes,
          shifts,
        )
        newEndDate = DateTime.fromISO(endDateStr, { zone: 'utc' })
      }

      const updatedWo: WorkOrder = {
        ...wo,
        data: {
          ...wo.data,
          startDate: newStartDate.toUTC().toISO()!,
          endDate: newEndDate.toUTC().toISO()!,
        },
      }

      updatedWorkOrders.push(updatedWo)
      // Only add to schedule if not already added (maintenance orders were pre-added)
      if (!wo.data.isMaintenance) {
        workCenterSchedules.get(wo.data.workCenterId)!.push({
          start: newStartDate,
          end: newEndDate,
          workOrderId: wo.docId,
        })
      }

      const oldStart = DateTime.fromISO(wo.data.startDate, { zone: 'utc' })
      const oldEnd = DateTime.fromISO(wo.data.endDate, { zone: 'utc' })

      if (oldStart.toMillis() !== newStartDate.toMillis() || oldEnd.toMillis() !== newEndDate.toMillis()) {
        const reason = this.getChangeReason(wo, oldStart, newStartDate, updatedWorkOrders, workOrderMap)
        changes.push({
          workOrderId: wo.docId,
          workOrderNumber: wo.data.workOrderNumber,
          oldStartDate: wo.data.startDate,
          newStartDate: updatedWo.data.startDate,
          oldEndDate: wo.data.endDate,
          newEndDate: updatedWo.data.endDate,
          reason,
        })
      }
    }

    const validation = validateConstraints(updatedWorkOrders, workCenters)
    if (!validation.valid) {
      throw new Error(`Reflow resulted in invalid schedule: ${validation.errors.join('; ')}`)
    }

    const explanation = this.generateExplanation(changes, workOrders.length)

    return {
      updatedWorkOrders,
      changes,
      explanation,
    }
  }

  private topologicalSort(workOrders: WorkOrder[], workOrderMap: Map<string, WorkOrder>): WorkOrder[] {
    const visited = new Set<string>()
    const visiting = new Set<string>()
    const result: WorkOrder[] = []

    const visit = (woId: string) => {
      if (visiting.has(woId)) {
        throw new Error(`Circular dependency detected involving work order ${woId}`)
      }
      if (visited.has(woId)) {
        return
      }

      visiting.add(woId)
      const wo = workOrderMap.get(woId)
      if (!wo) {
        throw new Error(`Work order ${woId} not found`)
      }

      for (const depId of wo.data.dependsOnWorkOrderIds) {
        visit(depId)
      }

      visiting.delete(woId)
      visited.add(woId)
      result.push(wo)
    }

    for (const wo of workOrders) {
      if (!visited.has(wo.docId)) {
        visit(wo.docId)
      }
    }

    return result
  }

  private getEarliestDependencyEnd(
    wo: WorkOrder,
    updatedWorkOrders: WorkOrder[],
    workOrderMap: Map<string, WorkOrder>,
  ): DateTime {
    if (wo.data.dependsOnWorkOrderIds.length === 0) {
      return DateTime.fromISO(wo.data.startDate, { zone: 'utc' })
    }

    let latestEnd = DateTime.fromMillis(0, { zone: 'utc' })
    for (const depId of wo.data.dependsOnWorkOrderIds) {
      const depWo = updatedWorkOrders.find(uwo => uwo.docId === depId) || workOrderMap.get(depId)
      if (!depWo) {
        throw new Error(`Dependency ${depId} not found for work order ${wo.data.workOrderNumber}`)
      }
      const depEnd = DateTime.fromISO(depWo.data.endDate, { zone: 'utc' })
      if (depEnd > latestEnd) {
        latestEnd = depEnd
      }
    }
    return latestEnd
  }

  private adjustToShiftStart(date: DateTime, shifts: WorkCenter['data']['shifts']): DateTime {
    if (dateUtils.isWithinAnyShift(date, shifts)) {
      return date
    }
    return dateUtils.getNextShiftStart(date, shifts)
  }

  private findAvailableSlot(
    startCandidate: DateTime,
    durationMinutes: number,
    workCenter: WorkCenter,
    existingSchedule: Array<{ start: DateTime; end: DateTime; workOrderId: string }>,
  ): DateTime {
    let current = startCandidate
    const maxIterations = 1000
    let iterations = 0

    while (iterations < maxIterations) {
      iterations++

      const endCandidate = DateTime.fromISO(
        dateUtils.calculateEndDateWithShifts(current.toUTC().toISO()!, durationMinutes, workCenter.data.shifts),
        { zone: 'utc' },
      )

      let hasConflict = false

      for (const mw of workCenter.data.maintenanceWindows) {
        const mwStart = DateTime.fromISO(mw.startDate, { zone: 'utc' })
        const mwEnd = DateTime.fromISO(mw.endDate, { zone: 'utc' })
        if (current < mwEnd && endCandidate > mwStart) {
          hasConflict = true
          current = mwEnd
          break
        }
      }

      if (hasConflict) {
        current = this.adjustToShiftStart(current, workCenter.data.shifts)
        continue
      }

      for (const scheduled of existingSchedule) {
        if (current < scheduled.end && endCandidate > scheduled.start) {
          hasConflict = true
          current = scheduled.end
          break
        }
      }

      if (hasConflict) {
        current = this.adjustToShiftStart(current, workCenter.data.shifts)
        continue
      }

      return current
    }

    throw new Error(`Could not find available slot for work order on work center ${workCenter.data.name}`)
  }

  private getChangeReason(
    wo: WorkOrder,
    oldStart: DateTime,
    newStart: DateTime,
    updatedWorkOrders: WorkOrder[],
    workOrderMap: Map<string, WorkOrder>,
  ): string {
    const reasons: string[] = []

    if (wo.data.dependsOnWorkOrderIds.length > 0) {
      const depEnd = this.getEarliestDependencyEnd(wo, updatedWorkOrders, workOrderMap)
      if (newStart <= depEnd.plus({ minutes: 1 })) {
        reasons.push('dependency constraint')
      }
    }

    if (oldStart.toMillis() !== newStart.toMillis()) {
      reasons.push('rescheduled')
    }

    return reasons.length > 0 ? reasons.join(', ') : 'schedule adjustment'
  }

  private generateExplanation(changes: Change[], totalWorkOrders: number): string {
    if (changes.length === 0) {
      return `No changes needed. All ${totalWorkOrders} work orders are already optimally scheduled.`
    }

    const movedCount = changes.length
    const unchangedCount = totalWorkOrders - movedCount

    const parts: string[] = []
    parts.push(`Reflow completed: ${movedCount} work order${movedCount !== 1 ? 's' : ''} rescheduled`)

    if (unchangedCount > 0) {
      parts.push(`${unchangedCount} unchanged`)
    }

    const reasons = new Set(changes.map(c => c.reason))
    if (reasons.size > 0) {
      parts.push(`Reasons: ${Array.from(reasons).join(', ')}`)
    }

    return parts.join('. ') + '.'
  }
}
