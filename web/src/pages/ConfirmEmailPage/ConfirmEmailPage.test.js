import { render } from '@redwoodjs/testing'

import ConfirmEmailPage from './ConfirmEmailPage'

describe('ConfirmEmailPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConfirmEmailPage />)
    }).not.toThrow()
  })
})
