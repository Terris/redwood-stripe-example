import { render } from '@redwoodjs/testing'

import GlobalLayout from './GlobalLayout'

describe('GlobalLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GlobalLayout />)
    }).not.toThrow()
  })
})
