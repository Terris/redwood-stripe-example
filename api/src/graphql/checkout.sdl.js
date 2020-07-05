import gql from 'graphql-tag'

export const schema = gql`
  type Checkout {
    invoice: Invoice
  }

  input CartItemInput {
    id: String!
    qty: Int!
    unitAmount: Int!
  }

  input CartInput {
    cartItems: [CartItemInput!]
    invoiceId: String
    syncToken: String!
  }

  type Query {
    checkout(input: CartInput!): Checkout!
  }
`
