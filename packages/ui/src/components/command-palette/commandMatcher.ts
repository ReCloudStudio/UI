import type { CommandItem } from './types'

export interface CommandMatch {
  item: CommandItem
  score: number
  index: number
}

/**
 * Scores a case-insensitive subsequence match. Consecutive characters and
 * word boundaries rank above scattered matches, while preserving input order
 * for equally relevant commands.
 */
export function scoreCommand(item: CommandItem, query: string): number | null {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  if (!normalizedQuery) return 0

  const haystack = [item.label, item.description, ...(item.keywords ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase()

  let score = 0
  let previousIndex = -2
  let cursor = 0

  for (const character of normalizedQuery) {
    const index = haystack.indexOf(character, cursor)
    if (index === -1) return null

    score += 10
    if (index === previousIndex + 1) score += 8
    if (index === 0 || /[\s/._:-]/.test(haystack[index - 1])) score += 5

    previousIndex = index
    cursor = index + 1
  }

  // Prefer concise labels when all other match characteristics are equal.
  return score - haystack.length / 1000
}

export function filterCommands(items: CommandItem[], query: string): CommandItem[] {
  return items
    .map((item, index): CommandMatch | null => {
      const score = scoreCommand(item, query)
      return score === null ? null : { item, score, index }
    })
    .filter((match): match is CommandMatch => match !== null)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ item }) => item)
}
