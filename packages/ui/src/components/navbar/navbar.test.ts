import { describe, expect, it } from 'vitest'
import { Navbar } from './index'

describe('Navbar component', () => {
  it('is exported as a Vue component', () => {
    expect(Navbar).toBeDefined()
    expect(Navbar.name || Navbar.__name).toBeDefined()
  })
})
