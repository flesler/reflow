import { DateTime } from 'luxon'
import { validateConstraints } from 'src/reflow/constraint-checker'
import type { Change, ReflowResult, Scenario, ScheduleInterval, WorkCenter, WorkOrder } from 'src/reflow/types'
import * as dateUtils from 'src/utils/date-utils'

export class ReflowService {
  /** Reschedules work orders respecting dependencies, conflicts, shifts, and maintenance. */
  reflow(input: Scenario): ReflowResult {
    const { workOrders, workCenters } = input
    const changes: Change[] = []
    const workCenterMap = new Map(workCenters.map(wc => [wc.docId, wc]))
    const workOrderMap = new Map(workOrders.map(wo => [wo.docId, wo]))

    const sortedWorkOrders = this.topologicalSort(workOrders, workOrderMap)
    const updatedWorkOrderMap = new Map<string, WorkOrder>()
    const workCenterSchedules = new Map<string, ScheduleInterval[]>()

    for (const workCenter of workCenters) {
      workCenterSchedules.set(workCenter.docId, [])
    }

    // Pre-populate schedules with maintenance orders (they can't be moved)
    for (const wo of sortedWorkOrders) {
      if (wo.data.isMaintenance) {
        const interval = this.createInterval(wo)
        workCenterSchedules.get(wo.data.workCenterId)!.push(interval)
      }
    }

    // Sort schedules after pre-populating maintenance orders
    for (const [workCenterId, schedule] of workCenterSchedules.entries()) {
      workCenterSchedules.set(workCenterId, dateUtils.sortByStart(schedule))
    }

    for (const wo of sortedWorkOrders) {
      const workCenter = workCenterMap.get(wo.data.workCenterId)!
      const schedule = workCenterSchedules.get(wo.data.workCenterId)!

      const { start: newStartDate, end: newEndDate } = this.scheduleWorkOrder(wo, workCenter, schedule, updatedWorkOrderMap, workOrderMap)

      const updatedWo: WorkOrder = {
        ...wo,
        data: {
          ...wo.data,
          startDate: newStartDate.toUTC().toISO()!,
          endDate: newEndDate.toUTC().toISO()!,
        },
      }

      updatedWorkOrderMap.set(wo.docId, updatedWo)

      if (!wo.data.isMaintenance) {
        schedule.push({ start: newStartDate, end: newEndDate, workOrderId: wo.docId })
        workCenterSchedules.set(wo.data.workCenterId, dateUtils.sortByStart(schedule))
      }

      const oldStart = dateUtils.iso(wo.data.startDate)
      const oldEnd = dateUtils.iso(wo.data.endDate)

      if (oldStart.toMillis() !== newStartDate.toMillis() || oldEnd.toMillis() !== newEndDate.toMillis()) {
        const reason = this.getChangeReason(wo, oldStart, newStartDate, updatedWorkOrderMap)
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

    const updatedWorkOrders = Array.from(updatedWorkOrderMap.values())
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

  /** Creates schedule interval from work order dates. */
  private createInterval(wo: WorkOrder): ScheduleInterval {
    return {
      start: dateUtils.iso(wo.data.startDate),
      end: dateUtils.iso(wo.data.endDate),
      workOrderId: wo.docId,
    }
  }

  /** Finds earliest available slot respecting dependencies, shifts, maintenance, and conflicts. */
  private scheduleWorkOrder(
    wo: WorkOrder,
    workCenter: WorkCenter,
    existingSchedule: ScheduleInterval[],
    updatedWorkOrderMap: Map<string, WorkOrder>,
    workOrderMap: Map<string, WorkOrder>,
  ): { start: DateTime; end: DateTime } {
    if (wo.data.isMaintenance) {
      const interval = this.createInterval(wo)
      return { start: interval.start, end: interval.end }
    }

    const originalStart = dateUtils.iso(wo.data.startDate)
    let candidateStart = this.getEarliestDependencyEnd(wo, updatedWorkOrderMap, workOrderMap)

    if (candidateStart < originalStart) {
      candidateStart = originalStart
    }

    candidateStart = this.adjustToShiftStart(candidateStart, workCenter.data.shifts)
    candidateStart = this.findAvailableSlot(candidateStart, wo.data.durationMinutes, workCenter, existingSchedule)

    const newEndDate = dateUtils.calculateEndDateWithShifts(
      candidateStart,
      wo.data.durationMinutes,
      workCenter.data.shifts,
    )

    return { start: candidateStart, end: newEndDate }
  }

  /** Sorts work orders topologically by dependencies, detecting cycles. */
  private topologicalSort(workOrders: WorkOrder[], workOrderMap: Map<string, WorkOrder>): WorkOrder[] {
    const visited = new Set<string>()
    const visiting = new Set<string>()
    const result: WorkOrder[] = []

    const visit = (woId: string) => {
      if (visited.has(woId)) {
        return
      }
      if (visiting.has(woId)) {
        throw new Error(`Circular dependency detected involving work order ${woId}`)
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
      visit(wo.docId)
    }

    return result
  }

  /** Returns latest dependency end date or work order start if no dependencies. */
  private getEarliestDependencyEnd(
    wo: WorkOrder,
    updatedWorkOrderMap: Map<string, WorkOrder>,
    workOrderMap: Map<string, WorkOrder>,
  ): DateTime {
    if (wo.data.dependsOnWorkOrderIds.length === 0) {
      return dateUtils.iso(wo.data.startDate)
    }

    return wo.data.dependsOnWorkOrderIds.reduce((latestEnd, depId) => {
      const depWo = updatedWorkOrderMap.get(depId) || workOrderMap.get(depId)
      if (!depWo) {
        throw new Error(`Dependency ${depId} not found for work order ${wo.data.workOrderNumber}`)
      }
      const depEnd = dateUtils.iso(depWo.data.endDate)
      return depEnd > latestEnd ? depEnd : latestEnd
    }, DateTime.fromMillis(0, { zone: 'utc' }))
  }

  /** Adjusts date to next shift start if outside shift hours. */
  private adjustToShiftStart(date: DateTime, shifts: WorkCenter['data']['shifts']): DateTime {
    if (dateUtils.isWithinAnyShift(date, shifts)) {
      return date
    }
    return dateUtils.getNextShiftStart(date, shifts)
  }

  /** Finds earliest available slot checking maintenance windows and schedule conflicts. */
  private findAvailableSlot(
    startCandidate: DateTime,
    durationMinutes: number,
    workCenter: WorkCenter,
    existingSchedule: ScheduleInterval[],
  ): DateTime {
    let current = startCandidate
    const maxIterations = 1000
    let iterations = 0

    while (iterations < maxIterations) {
      iterations++

      const endCandidate = dateUtils.calculateEndDateWithShifts(current, durationMinutes, workCenter.data.shifts)

      const candidateInterval: ScheduleInterval = { start: current, end: endCandidate, workOrderId: '' }

      // Check maintenance windows
      for (const mw of workCenter.data.maintenanceWindows) {
        const mwStart = dateUtils.iso(mw.startDate)
        const mwEnd = dateUtils.iso(mw.endDate)
        if (dateUtils.hasWorkingTimeOverlapWithMaintenance(current, endCandidate, mwStart, mwEnd, workCenter.data.shifts)) {
          current = mwEnd
          current = this.adjustToShiftStart(current, workCenter.data.shifts)
          continue
        }
      }

      // Check existing schedule (sorted, so we can optimize)
      let hasConflict = false
      for (const scheduled of existingSchedule) {
        if (dateUtils.overlaps(candidateInterval, scheduled)) {
          hasConflict = true
          current = scheduled.end
          current = this.adjustToShiftStart(current, workCenter.data.shifts)
          break
        }
        // Since schedule is sorted, if we've passed all possible overlaps, we can stop
        if (scheduled.start > endCandidate) {
          break
        }
      }

      if (!hasConflict) {
        return current
      }
    }

    throw new Error(`Could not find available slot for work order on work center ${workCenter.data.name}`)
  }

  /** Determines change reason: dependency, rescheduling, or adjustment. */
  private getChangeReason(
    wo: WorkOrder,
    oldStart: DateTime,
    newStart: DateTime,
    updatedWorkOrderMap: Map<string, WorkOrder>,
  ): string {
    const reasons: string[] = []

    // Check if dependency constraint was binding
    if (wo.data.dependsOnWorkOrderIds.length > 0) {
      const originalStart = dateUtils.iso(wo.data.startDate)
      const latestDepEnd = wo.data.dependsOnWorkOrderIds.reduce((max, depId) => {
        const depWo = updatedWorkOrderMap.get(depId)
        if (!depWo) return max
        const depEnd = dateUtils.iso(depWo.data.endDate)
        return depEnd > max ? depEnd : max
      }, DateTime.fromMillis(0, { zone: 'utc' }))
      // If dependency end is after original start, dependency was likely the binding constraint
      if (latestDepEnd > originalStart) {
        reasons.push('dependency constraint')
      }
    }

    // If moved from original position, it was rescheduled
    if (oldStart.toMillis() !== newStart.toMillis()) {
      reasons.push('rescheduled')
    }

    return reasons.length > 0 ? reasons.join(', ') : 'schedule adjustment'
  }

  /** Generates explanation of reflow results with counts. */
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
