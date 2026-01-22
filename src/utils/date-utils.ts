import { DateTime } from 'luxon'
import type { Shift } from 'src/reflow/types'

export function isWithinShift(date: DateTime, shift: Shift): boolean {
  const dayOfWeek = date.weekday === 7 ? 0 : date.weekday
  if (dayOfWeek !== shift.dayOfWeek) {
    return false
  }
  const hour = date.hour
  if (shift.startHour < shift.endHour) {
    return hour >= shift.startHour && hour < shift.endHour
  }
  return hour >= shift.startHour || hour < shift.endHour
}

export function isWithinAnyShift(date: DateTime, shifts: Shift[]): boolean {
  return shifts.some(shift => isWithinShift(date, shift))
}

export function getNextShiftStart(date: DateTime, shifts: Shift[]): DateTime {
  let current = date.startOf('hour')
  const maxDays = 14
  for (let day = 0; day < maxDays; day++) {
    const checkDate = current.plus({ days: day })
    for (const shift of shifts) {
      const dayOfWeek = checkDate.weekday === 7 ? 0 : checkDate.weekday
      if (dayOfWeek === shift.dayOfWeek) {
        const shiftStart = checkDate.set({ hour: shift.startHour, minute: 0, second: 0, millisecond: 0 })
        if (shiftStart > date) {
          return shiftStart
        }
      }
    }
  }
  throw new Error('Could not find next shift start')
}

export function calculateEndDateWithShifts(
  startDate: string,
  durationMinutes: number,
  shifts: Shift[],
): string {
  let current = DateTime.fromISO(startDate, { zone: 'utc' })
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

    const dayOfWeek = current.weekday === 7 ? 0 : current.weekday
    if (dayOfWeek !== currentShift.dayOfWeek) {
      current = getNextShiftStart(current, shifts)
      continue
    }

    const hour = current.hour
    let shiftEndHour = currentShift.endHour
    if (shiftEndHour <= hour) {
      shiftEndHour += 24
    }

    const minutesUntilShiftEnd = (shiftEndHour - hour) * 60 - current.minute

    if (remainingMinutes <= minutesUntilShiftEnd) {
      current = current.plus({ minutes: remainingMinutes })
      remainingMinutes = 0
    } else {
      remainingMinutes -= minutesUntilShiftEnd
      current = current.set({ hour: shiftEndHour % 24, minute: 0 })
      if (shiftEndHour >= 24) {
        current = current.plus({ days: 1 })
      }
      current = getNextShiftStart(current, shifts)
    }
  }

  if (iterations >= maxIterations) {
    throw new Error('Maximum iterations reached calculating end date with shifts')
  }

  const iso = current.toUTC().toISO()
  if (!iso) {
    throw new Error('Failed to convert date to ISO string')
  }
  return iso
}

export function minutesBetween(startDate: string, endDate: string, shifts: Shift[]): number {
  let current = DateTime.fromISO(startDate, { zone: 'utc' })
  const end = DateTime.fromISO(endDate, { zone: 'utc' })
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

    const dayOfWeek = current.weekday === 7 ? 0 : current.weekday
    if (dayOfWeek !== currentShift.dayOfWeek) {
      current = getNextShiftStart(current, shifts)
      continue
    }

    const hour = current.hour
    let shiftEndHour = currentShift.endHour
    if (shiftEndHour <= hour) {
      shiftEndHour += 24
    }

    const minutesUntilShiftEnd = (shiftEndHour - hour) * 60 - current.minute
    const nextCheck = current.plus({ minutes: Math.min(minutesUntilShiftEnd, end.diff(current, 'minutes').minutes) })

    if (nextCheck >= end) {
      totalMinutes += end.diff(current, 'minutes').minutes
      break
    }

    totalMinutes += minutesUntilShiftEnd
    current = current.set({ hour: shiftEndHour % 24, minute: 0 })
    if (shiftEndHour >= 24) {
      current = current.plus({ days: 1 })
    }
    current = getNextShiftStart(current, shifts)
  }

  if (iterations >= maxIterations) {
    throw new Error('Maximum iterations reached calculating minutes between dates')
  }

  return totalMinutes
}
