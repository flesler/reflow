import { DateTime } from 'luxon'
import type { Interval, Shift } from 'src/reflow/types'

export function iso(dateString: string): DateTime {
  return DateTime.fromISO(dateString, { zone: 'utc' })
}

export function overlaps(a: Interval, b: Interval): boolean {
  return a.start < b.end && a.end > b.start
}

export function sortByStart<T extends Interval>(intervals: T[]): T[] {
  return [...intervals].sort((a, b) => a.start.toMillis() - b.start.toMillis())
}

export function isWithinShift(date: DateTime, shift: Shift): boolean {
  const dayOfWeek = date.weekday === 7 ? 0 : date.weekday
  const hour = date.hour

  if (shift.startHour < shift.endHour) {
    // Normal shift (e.g., 8→17): same day
    return dayOfWeek === shift.dayOfWeek && hour >= shift.startHour && hour < shift.endHour
  } else {
    // Overnight shift (e.g., 22→06): spans midnight
    if (dayOfWeek === shift.dayOfWeek) {
      // Before midnight: hour >= startHour
      return hour >= shift.startHour
    } else {
      // After midnight: check if it's the next day after shift.dayOfWeek and hour < endHour
      const nextDayOfWeek = (shift.dayOfWeek + 1) % 7
      return dayOfWeek === nextDayOfWeek && hour < shift.endHour
    }
  }
}

export function isWithinAnyShift(date: DateTime, shifts: Shift[]): boolean {
  return shifts.some(shift => isWithinShift(date, shift))
}

export function getNextShiftStart(date: DateTime, shifts: Shift[]): DateTime {
  const candidates: DateTime[] = []
  const maxDays = 14

  for (let day = 0; day < maxDays; day++) {
    const checkDate = date.startOf('hour').plus({ days: day })
    for (const shift of shifts) {
      const dayOfWeek = checkDate.weekday === 7 ? 0 : checkDate.weekday

      if (shift.startHour < shift.endHour) {
        // Normal shift: check same day
        if (dayOfWeek === shift.dayOfWeek) {
          const shiftStart = checkDate.set({ hour: shift.startHour, minute: 0, second: 0, millisecond: 0 })
          if (shiftStart > date) {
            candidates.push(shiftStart)
          }
        }
      } else {
        // Overnight shift: check start day and next day (for continuation after midnight)
        if (dayOfWeek === shift.dayOfWeek) {
          // Start of overnight shift
          const shiftStart = checkDate.set({ hour: shift.startHour, minute: 0, second: 0, millisecond: 0 })
          if (shiftStart > date) {
            candidates.push(shiftStart)
          }
        } else {
          // Check if we're on the continuation day (next day after shift.dayOfWeek)
          const nextDayOfWeek = (shift.dayOfWeek + 1) % 7
          if (dayOfWeek === nextDayOfWeek) {
            // If we're past midnight but before shift end, the "next start" is actually the continuation
            // But if we're after shift end, we want the next cycle's start
            if (date.hour >= shift.endHour) {
              // We're past the shift end, so next start is the next cycle
              continue
            }
            // We're still in the overnight shift, so next start is the next cycle's start
            // Find the next occurrence of shift.dayOfWeek
            const daysUntilNextShift = (shift.dayOfWeek - dayOfWeek + 7) % 7 || 7
            const nextShiftDate = checkDate.plus({ days: daysUntilNextShift })
            const shiftStart = nextShiftDate.set({ hour: shift.startHour, minute: 0, second: 0, millisecond: 0 })
            if (shiftStart > date) {
              candidates.push(shiftStart)
            }
          }
        }
      }
    }
  }

  if (candidates.length === 0) {
    throw new Error('Could not find next shift start')
  }

  // Return the earliest candidate
  return candidates.reduce((earliest, candidate) => (candidate < earliest ? candidate : earliest))
}

export function calculateEndDateWithShifts(
  startDate: DateTime,
  durationMinutes: number,
  shifts: Shift[],
): DateTime {
  let current = startDate
  let remainingMinutes = durationMinutes

  const maxIterations = 1000
  let iterations = 0

  while (remainingMinutes > 0 && iterations < maxIterations) {
    iterations++

    const currentShift = shifts.find(shift => isWithinShift(current, shift))
    if (!currentShift) {
      current = getNextShiftStart(current, shifts)
      continue
    }

    const hour = current.hour
    const shiftEndHour = currentShift.endHour
    let shiftEndDate: DateTime

    if (currentShift.startHour < currentShift.endHour) {
      // Normal shift: end is same day
      shiftEndDate = current.set({ hour: shiftEndHour, minute: 0, second: 0, millisecond: 0 })
    } else {
      // Overnight shift: end is next day
      const dayOfWeek = current.weekday === 7 ? 0 : current.weekday
      const shiftDayOfWeek = currentShift.dayOfWeek
      if (dayOfWeek === shiftDayOfWeek && hour >= currentShift.startHour) {
        // Before midnight: end is next day
        shiftEndDate = current.plus({ days: 1 }).set({ hour: shiftEndHour, minute: 0, second: 0, millisecond: 0 })
      } else {
        // After midnight: end is same day
        shiftEndDate = current.set({ hour: shiftEndHour, minute: 0, second: 0, millisecond: 0 })
      }
    }

    const minutesUntilShiftEnd = shiftEndDate.diff(current, 'minutes').minutes

    if (remainingMinutes <= minutesUntilShiftEnd) {
      current = current.plus({ minutes: remainingMinutes })
      remainingMinutes = 0
    } else {
      remainingMinutes -= minutesUntilShiftEnd
      current = shiftEndDate
      current = getNextShiftStart(current, shifts)
    }
  }

  if (iterations >= maxIterations) {
    throw new Error('Maximum iterations reached calculating end date with shifts')
  }

  return current
}

export function minutesBetween(startDate: string, endDate: string, shifts: Shift[]): number {
  let current = iso(startDate)
  const end = iso(endDate)
  let totalMinutes = 0

  const maxIterations = 1000
  let iterations = 0

  while (current < end && iterations < maxIterations) {
    iterations++

    const currentShift = shifts.find(shift => isWithinShift(current, shift))
    if (!currentShift) {
      current = getNextShiftStart(current, shifts)
      continue
    }

    const hour = current.hour
    let shiftEndHour = currentShift.endHour
    let shiftEndDate = current

    if (currentShift.startHour < currentShift.endHour) {
      // Normal shift: end is same day
      shiftEndDate = current.set({ hour: shiftEndHour, minute: 0, second: 0, millisecond: 0 })
    } else {
      // Overnight shift: end is next day
      const dayOfWeek = current.weekday === 7 ? 0 : current.weekday
      const shiftDayOfWeek = currentShift.dayOfWeek
      if (dayOfWeek === shiftDayOfWeek && hour >= currentShift.startHour) {
        // Before midnight: end is next day
        shiftEndDate = current.plus({ days: 1 }).set({ hour: shiftEndHour, minute: 0, second: 0, millisecond: 0 })
      } else {
        // After midnight: end is same day
        shiftEndDate = current.set({ hour: shiftEndHour, minute: 0, second: 0, millisecond: 0 })
      }
    }

    const minutesUntilShiftEnd = shiftEndDate.diff(current, 'minutes').minutes
    const nextCheck = current.plus({ minutes: Math.min(minutesUntilShiftEnd, end.diff(current, 'minutes').minutes) })

    if (nextCheck >= end) {
      totalMinutes += end.diff(current, 'minutes').minutes
      break
    }

    totalMinutes += minutesUntilShiftEnd
    current = shiftEndDate
    current = getNextShiftStart(current, shifts)
  }

  if (iterations >= maxIterations) {
    throw new Error('Maximum iterations reached calculating minutes between dates')
  }

  return totalMinutes
}

export function hasWorkingTimeOverlapWithMaintenance(
  workStart: DateTime,
  workEnd: DateTime,
  maintenanceStart: DateTime,
  maintenanceEnd: DateTime,
  shifts: Shift[],
): boolean {
  let current = workStart
  const maxIterations = 1000
  let iterations = 0

  while (current < workEnd && iterations < maxIterations) {
    iterations++

    const currentShift = shifts.find(shift => isWithinShift(current, shift))
    if (!currentShift) {
      current = getNextShiftStart(current, shifts)
      continue
    }

    const hour = current.hour
    let shiftEndHour = currentShift.endHour
    let shiftEndDate = current

    if (currentShift.startHour < currentShift.endHour) {
      // Normal shift: end is same day
      shiftEndDate = current.set({ hour: shiftEndHour, minute: 0, second: 0, millisecond: 0 })
    } else {
      // Overnight shift: end is next day
      const dayOfWeek = current.weekday === 7 ? 0 : current.weekday
      const shiftDayOfWeek = currentShift.dayOfWeek
      if (dayOfWeek === shiftDayOfWeek && hour >= currentShift.startHour) {
        // Before midnight: end is next day
        shiftEndDate = current.plus({ days: 1 }).set({ hour: shiftEndHour, minute: 0, second: 0, millisecond: 0 })
      } else {
        // After midnight: end is same day
        shiftEndDate = current.set({ hour: shiftEndHour, minute: 0, second: 0, millisecond: 0 })
      }
    }

    const minutesUntilShiftEnd = shiftEndDate.diff(current, 'minutes').minutes
    const workingPeriodEnd = current.plus({ minutes: Math.min(minutesUntilShiftEnd, workEnd.diff(current, 'minutes').minutes) })

    const periodStart = current
    const periodEnd = workingPeriodEnd < workEnd ? workingPeriodEnd : workEnd

    if (periodStart < maintenanceEnd && periodEnd > maintenanceStart) {
      return true
    }

    if (workingPeriodEnd >= workEnd) {
      break
    }

    current = shiftEndDate
    current = getNextShiftStart(current, shifts)
  }

  return false
}
