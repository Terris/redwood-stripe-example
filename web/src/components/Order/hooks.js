import { useQuery } from '@apollo/react-hooks'

const ORDER_QUERY = gql`
  query FIND_ORDER_BY_ID($id: String!) {
    order: order(id: $id) {
      id
      invoice {
        id
        number
        total
        customerShipping {
          name
          address {
            line1
            line2
            city
            state
            postalCode
          }
        }
        lines {
          id
          amount
          qty
          price
          product {
            name
            description
            images
            unitAmount
          }
        }
      }
    }
  }
`

export const useOrder = ({ id }) => {
  const { loading, error, data } = useQuery(ORDER_QUERY, {
    variables: { id },
  })
  return { loading, error, data }
}
