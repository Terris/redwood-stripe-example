import gql from 'graphql-tag'

export const schema = gql`
  type Intent {
    id: String!
    paymentMethodId: String
    customerId: String
    shippingAddress: ShippingAddress
  }

  type ShippingAddress {
    addressLine1: String!
    addressLine2: String
    addressCity: String!
    addressState: String!
    addressPostalCode: String!
  }

  input CreateIntentInput {
    paymentMethodId: String!
    shippingAddress: ShippingAddressInput
  }

  input ShippingAddressInput {
    addressLine1: String
    addressLine2: String
    addressCity: String
    addressState: String
    addressPostalCode: String
  }

  type Mutation {
    createIntent(input: CreateIntentInput!): Intent!
  }
`
