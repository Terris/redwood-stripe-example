import { useMutation } from '@apollo/react-hooks'

// QUERIES
const SET_CHECKOUT_CUSTOMER = gql`
  mutation SET_CHECKOUT_CUSTOMER($input: SetCustomerInput!) {
    checkout: setCheckoutCustomer(input: $input) {
      via
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
