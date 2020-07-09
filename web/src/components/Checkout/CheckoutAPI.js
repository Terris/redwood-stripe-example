import { useMutation } from '@apollo/react-hooks'

// MUTATIONS
const SET_CUSTOMER = gql`
  mutation setCustomerMutation($input: SetCustomerInput!) {
    setCustomer(input: $input) {
      customer {
        id
        email
        shipping {
          name
          address {
            line1
            line2
            city
            state
            postalCode
          }
        }
      }
    }
  }
`

const SET_SHIPPING = gql`
  mutation setShippingMutation($id: String!, $input: SetShippingInput!) {
    setShipping(id: $id, input: $input) {
      id
      shipping {
        name
        address {
          line1
          line2
          city
          state
          postalCode
        }
      }
    }
  }
`

// API
export const CheckoutAPI = () => {
  const [setCustomer] = useMutation(SET_CUSTOMER)
  const [setShipping] = useMutation(SET_SHIPPING)
  return {
    customer: {
      set: setCustomer,
      setShipping,
    },
  }
}
