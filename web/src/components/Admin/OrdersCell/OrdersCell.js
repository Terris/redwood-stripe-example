import Orders from 'src/components/Admin/Orders'

import { Loader } from 'src/components/UI'

export const QUERY = gql`
  query ORDERS {
    orders {
      id
      invoice {
        number
        status
        total
      }
    }
  }
`

export const beforeQuery = (props) => {
  return { variables: props }
}

export const Loading = () => <Loader />

export const Empty = () => {
  return <div className="rw-text-center">No orders yet.</div>
}

export const Success = ({ orders }) => {
  return <Orders orders={orders} />
}
