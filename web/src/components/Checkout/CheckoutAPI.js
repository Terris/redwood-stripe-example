import { useMutation } from '@apollo/react-hooks'

// QUERIES
const SET_CHECKOUT_CUSTOMER = gql`
  mutation setCheckoutCustomer($input: SetCheckoutCustomerInput!) {
    setCheckoutCustomer(input: $input) {
      customer {
        id
      }
    }
  }
`

// MUTATIONS

// API
export const CheckoutAPI = () => {
  const [setCustomer, { error, loading, data }] = useMutation(
    SET_CHECKOUT_CUSTOMER
  )
  return { customer: { set: setCustomer, data, loading, error } }
}
