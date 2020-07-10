import gql from 'graphql-tag'

export const schema = gql`
  type PaymentIntent {
    clientSecret: String!
    status: String!
  }
`
