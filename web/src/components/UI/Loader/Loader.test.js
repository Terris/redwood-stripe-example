import { render } from '@redwoodjs/testing'

import Loader from './Loader'

describe('Loader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Loader />)
    }).not.toThrow()
  })
})
