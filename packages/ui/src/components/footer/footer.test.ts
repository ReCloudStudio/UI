import { describe, expect, it } from 'vitest'
import { Footer } from './index'

describe('Footer component', () => {
  it('is exported as a Vue component', () => {
    expect(Footer).toBeDefined()
    expect(Footer.name || Footer.__name).toBeDefined()
  })
})
