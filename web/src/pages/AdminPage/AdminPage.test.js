import { render } from '@redwoodjs/testing'

import AdminPage from './AdminPage'

describe('AdminPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminPage />)
    }).not.toThrow()
  })
})
