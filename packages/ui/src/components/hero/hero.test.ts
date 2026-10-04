import { describe, expect, it } from 'vitest'
import { Hero } from './index'

describe('Hero component', () => {
  it('is exported as a Vue component', () => {
    expect(Hero).toBeDefined()
    expect(Hero.name || Hero.__name).toBeDefined()
  })
})
