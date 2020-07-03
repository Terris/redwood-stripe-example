import { useQuery } from '@redwoodjs/web'

import { useCart } from 'src/components/Cart'

const QUERY = gql`
  query RESOLVE_CHECKOUT($id: String) {
    checkout: checkout(id: $id) {
      id
    }
  }
`

export const useCheckout = () => {
  const { invoiceId } = useCart()

  // get checkout
  const { loading, error, data: checkout } = useQuery(QUERY, {
    variables: { id: invoiceId },
  })

  return {
    checkout,
    loading,
    error,
  }
}
