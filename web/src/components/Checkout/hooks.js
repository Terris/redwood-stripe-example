import { useQuery } from '@redwoodjs/web'

import { useCart } from 'src/components/Cart'

const QUERY = gql`
  query RESOLVE_CHECKOUT($input: CartInput!) {
    checkout: checkout(input: $input) {
      invoiceId
      invoice {
        id
        amount_due
        customer
        lines {
          data {
            id
          }
        }
      }
    }
  }
`

export const useCheckout = () => {
  const { cart, setInvoiceId } = useCart()

  // get checkout
  const { loading, error, data: checkout } = useQuery(QUERY, {
    variables: { input: { ...cart } },
    onCompleted: (res) => {
      if (cart.invoiceId !== res.checkout.invoiceId) {
        setInvoiceId({ id: res.checkout.invoiceId })
      }
    },
  })

  return {
    checkout,
    loading,
    error,
  }
}
