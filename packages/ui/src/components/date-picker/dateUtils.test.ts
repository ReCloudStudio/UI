import { describe, expect, it } from 'vitest'
import { addMonths, monthDays, parseDateKey, toDateKey } from './dateUtils'

describe('dateUtils', () => {
  it('parses only valid ISO date keys', () => {
    expect(toDateKey(parseDateKey('2026-02-28')!)).toBe('2026-02-28')
    expect(parseDateKey('2026-02-30')).toBeUndefined()
  })

  it('always generates a six-week calendar grid', () => {
    const days = monthDays(new Date(2026, 1, 1))
    expect(days).toHaveLength(42)
    expect(days.some((day) => day.key === '2026-02-01')).toBe(true)
  })

  it('moves months over year boundaries', () => {
    expect(toDateKey(addMonths(new Date(2026, 0, 1), -1))).toBe('2025-12-01')
  })
})
