import { render } from '@redwoodjs/testing'

import SignInPage from './SignInPage'

describe('SignInPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignInPage />)
    }).not.toThrow()
  })
})
