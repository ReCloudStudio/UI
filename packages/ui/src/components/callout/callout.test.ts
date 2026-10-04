import { describe, expect, it } from 'vitest'
import { Callout } from './index'

describe('Callout component', () => {
  it('is exported as a Vue component', () => {
    expect(Callout).toBeDefined()
    expect(Callout.name || Callout.__name).toBeDefined()
  })
})
