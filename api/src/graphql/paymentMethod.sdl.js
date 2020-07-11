import gql from 'graphql-tag'

export const schema = gql`
  type PaymentMethod {
    id: String!
    brand: String!
    last4: String!
  }
`
