import { render } from '@redwoodjs/testing'

import ForgotPasswordPage from './ForgotPasswordPage'

describe('ForgotPasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ForgotPasswordPage />)
    }).not.toThrow()
  })
})
