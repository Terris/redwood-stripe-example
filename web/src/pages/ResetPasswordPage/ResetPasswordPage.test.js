import { render } from '@redwoodjs/testing'

import ResetPasswordPage from './ResetPasswordPage'

describe('ResetPasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResetPasswordPage />)
    }).not.toThrow()
  })
})
