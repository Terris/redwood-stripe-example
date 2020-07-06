import Product from 'src/components/Admin/Product'

import { Loader } from 'src/components/UI'

export const QUERY = gql`
  query FIND_PRODUCT_BY_ID($id: String!) {
    product: product(id: $id) {
      id
      name
      description
      unitAmount
      images
    }
  }
`

export const Loading = () => <Loader />

export const Empty = () => <div>Product not found</div>

export const Success = ({ product }) => {
  return <Product product={product} />
}
