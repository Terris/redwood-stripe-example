import gql from 'graphql-tag'

export const schema = gql`
  type Checkout {
    invoiceId: String!
    customerId: String!
    invoice: Invoice
  }

  input CartItemInput {
    id: String!
    qty: Int!
    unitAmount: Int!
  }

  input CartInput {
    cartItems: [CartItemInput!]
    status: String
    invoiceId: String
  }

  type Query {
    checkout(input: CartInput!): Checkout!
  }
`
