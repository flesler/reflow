import { DateTime } from 'luxon'
import { validateConstraints } from 'src/reflow/constraint-checker'
import type { Change, ReflowResult, Scenario, WorkCenter, WorkOrder } from 'src/reflow/types'
import * as dateUtils from 'src/utils/date-utils'

type ScheduleInterval = {
  start: DateTime
  end: DateTime
  workOrderId: string
}

function overlaps(a: ScheduleInterval, b: ScheduleInterval): boolean {
  return a.start < b.end && a.end > b.start
}

function sortByStart(intervals: ScheduleInterval[]): ScheduleInterval[] {
  return [...intervals].sort((a, b) => a.start.toMillis() - b.start.toMillis())
}

export class ReflowService {
  reflow(input: Scenario): ReflowResult {
    const { workOrders, workCenters } = input
    const changes: Change[] = []
    const workCenterMap = new Map(workCenters.map(wc => [wc.docId, wc]))
    const workOrderMap = new Map(workOrders.map(wo => [wo.docId, wo]))

    const sortedWorkOrders = this.topologicalSort(workOrders, workOrderMap)
    const updatedWorkOrders: WorkOrder[] = []
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
      workCenterSchedules.set(workCenterId, sortByStart(schedule))
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

      updatedWorkOrders.push(updatedWo)
      updatedWorkOrderMap.set(wo.docId, updatedWo)

      if (!wo.data.isMaintenance) {
        const newInterval = { start: newStartDate, end: newEndDate, workOrderId: wo.docId }
        schedule.push(newInterval)
        workCenterSchedules.set(wo.data.workCenterId, sortByStart(schedule))
      }

      const oldStart = DateTime.fromISO(wo.data.startDate, { zone: 'utc' })
      const oldEnd = DateTime.fromISO(wo.data.endDate, { zone: 'utc' })

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

  private createInterval(wo: WorkOrder): ScheduleInterval {
    return {
      start: DateTime.fromISO(wo.data.startDate, { zone: 'utc' }),
      end: DateTime.fromISO(wo.data.endDate, { zone: 'utc' }),
      workOrderId: wo.docId,
    }
  }

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

    const originalStart = DateTime.fromISO(wo.data.startDate, { zone: 'utc' })
    let candidateStart = this.getEarliestDependencyEnd(wo, updatedWorkOrderMap, workOrderMap)

    if (candidateStart < originalStart) {
      candidateStart = originalStart
    }

    candidateStart = this.adjustToShiftStart(candidateStart, workCenter.data.shifts)
    candidateStart = this.findAvailableSlot(candidateStart, wo.data.durationMinutes, workCenter, existingSchedule)

    const endDateStr = dateUtils.calculateEndDateWithShifts(
      candidateStart.toUTC().toISO()!,
      wo.data.durationMinutes,
      workCenter.data.shifts,
    )
    const newEndDate = DateTime.fromISO(endDateStr, { zone: 'utc' })

    return { start: candidateStart, end: newEndDate }
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
    updatedWorkOrderMap: Map<string, WorkOrder>,
    workOrderMap: Map<string, WorkOrder>,
  ): DateTime {
    if (wo.data.dependsOnWorkOrderIds.length === 0) {
      return DateTime.fromISO(wo.data.startDate, { zone: 'utc' })
    }

    let latestEnd = DateTime.fromMillis(0, { zone: 'utc' })
    for (const depId of wo.data.dependsOnWorkOrderIds) {
      const depWo = updatedWorkOrderMap.get(depId) || workOrderMap.get(depId)
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
    existingSchedule: ScheduleInterval[],
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

      const candidateInterval: ScheduleInterval = { start: current, end: endCandidate, workOrderId: '' }

      // Check maintenance windows
      for (const mw of workCenter.data.maintenanceWindows) {
        const mwStart = DateTime.fromISO(mw.startDate, { zone: 'utc' })
        const mwEnd = DateTime.fromISO(mw.endDate, { zone: 'utc' })
        if (dateUtils.hasWorkingTimeOverlapWithMaintenance(current, endCandidate, mwStart, mwEnd, workCenter.data.shifts)) {
          current = mwEnd
          current = this.adjustToShiftStart(current, workCenter.data.shifts)
          continue
        }
      }

      // Check existing schedule (sorted, so we can optimize)
      let hasConflict = false
      for (const scheduled of existingSchedule) {
        if (overlaps(candidateInterval, scheduled)) {
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

  private getChangeReason(
    wo: WorkOrder,
    oldStart: DateTime,
    newStart: DateTime,
    updatedWorkOrderMap: Map<string, WorkOrder>,
  ): string {
    const reasons: string[] = []

    // Check if dependency constraint was binding
    if (wo.data.dependsOnWorkOrderIds.length > 0) {
      const originalStart = DateTime.fromISO(wo.data.startDate, { zone: 'utc' })
      let latestDepEnd = DateTime.fromMillis(0, { zone: 'utc' })
      for (const depId of wo.data.dependsOnWorkOrderIds) {
        const depWo = updatedWorkOrderMap.get(depId)
        if (depWo) {
          const depEnd = DateTime.fromISO(depWo.data.endDate, { zone: 'utc' })
          if (depEnd > latestDepEnd) {
            latestDepEnd = depEnd
          }
        }
      }
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
