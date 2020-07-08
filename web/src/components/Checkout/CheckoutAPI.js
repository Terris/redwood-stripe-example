import { useMutation } from '@apollo/react-hooks'

// MUTATIONS
const SET_CUSTOMER = gql`
  mutation setCustomerMutation($input: SetCustomerInput!) {
    setCustomer(input: $input) {
      customer {
        id
      }
    }
  }
`

const SET_SHIPPING = gql`
  mutation setShippingMutation($id: String!, $input: SetShippingInput!) {
    setShipping(id: $id, input: $input) {
      id
    }
  }
`

// API
export const CheckoutAPI = () => {
  const [setCustomer, { error: setCustomerError }] = useMutation(SET_CUSTOMER)
  const [setShipping, { error: setShippingError }] = useMutation(SET_SHIPPING)
  return {
    customer: {
      set: setCustomer,
      setShipping,
      error: setCustomerError || setShippingError,
    },
  }
}
