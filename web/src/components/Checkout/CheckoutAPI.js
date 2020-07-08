import { useMutation } from '@apollo/react-hooks'

// MUTATIONS
const SET_CHECKOUT_CUSTOMER = gql`
  mutation setCheckoutCustomer($input: SetCheckoutCustomerInput!) {
    setCheckoutCustomer(input: $input) {
      customer {
        id
      }
    }
  }
`

// API
export const CheckoutAPI = () => {
  const [setCustomer] = useMutation(SET_CHECKOUT_CUSTOMER)
  return { customer: { set: setCustomer } }
}
