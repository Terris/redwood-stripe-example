import ProductList from './ProductList'

export const QUERY = gql`
  query PRODUCTS {
    products {
      id
      name
      description
      unitAmount
      priceId
      images
    }
  }
`

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'network-only' }
}

export const Loading = () => <p>Loading...</p>

export const Empty = () => {
  return <p>No products are available at this time.</p>
}

export const Success = ({ products }) => {
  return <ProductList products={products} />
}
