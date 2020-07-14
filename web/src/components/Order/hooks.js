import { useQuery } from '@apollo/react-hooks'

const ORDER_QUERY = gql`
  query FIND_ORDER_BY_ID($id: String!) {
    order: order(id: $id) {
      id
      invoice {
        id
        status
        lines {
          id
          amount
          qty
          productId
        }
      }
    }
  }
`

export const useOrder = ({ id }) => {
  const { loading, error, data: order } = useQuery(ORDER_QUERY, {
    variables: { id },
  })
  return { loading, error, order }
}
