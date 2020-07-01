import { render } from '@redwoodjs/testing'

import ProductList from './ProductList'

describe('ProductList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProductList />)
    }).not.toThrow()
  })
})
