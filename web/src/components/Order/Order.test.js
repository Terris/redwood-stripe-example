import { render } from '@redwoodjs/testing'

import Order from './Order'

describe('Order', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Order />)
    }).not.toThrow()
  })
})
