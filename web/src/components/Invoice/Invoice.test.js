import { render } from '@redwoodjs/testing'

import Invoice from './Invoice'

describe('Invoice', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Invoice />)
    }).not.toThrow()
  })
})
