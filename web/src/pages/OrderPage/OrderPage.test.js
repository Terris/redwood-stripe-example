import { render } from '@redwoodjs/testing'

import OrdersPage from './OrdersPage'

describe('OrdersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrdersPage />)
    }).not.toThrow()
  })
})
