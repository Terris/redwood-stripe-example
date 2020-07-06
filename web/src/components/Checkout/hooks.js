import { useQuery } from '@redwoodjs/web'

import { useCart } from 'src/components/Cart'

const QUERY = gql`
  query RESOLVE_CHECKOUT($input: CartInput!) {
    checkout: checkout(input: $input) {
      invoice {
        id
        amount_due
        lines {
          id
          amount
          productId
          qty
        }
      }
    }
  }
`

export const useCheckout = () => {
  const { cart, setInvoiceId } = useCart()

  // get checkout
  const { loading, error, data } = useQuery(QUERY, {
    variables: { input: { ...cart } },
    onCompleted: (res) => {
      if (cart.invoiceId !== res.checkout.invoice.id) {
        setInvoiceId({ id: res.checkout.invoice.id })
      }
    },
  })

  return {
    checkout: data?.checkout,
    loading: !cart.invoiceId ? true : loading,
    error,
  }
}
