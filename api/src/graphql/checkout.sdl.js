import gql from 'graphql-tag'

export const schema = gql`
  type CartItems {
    id: String!
    qty: Int!
    unitAmount: Int!
  }

  type Cart {
    id: String!
    cartItems: [CartItem!]
    status: String
    invoiceId: String
  }

  type Checkout {
    id: String!
    customer: Customer
    invoice: Invoice
  }

  type Query {
    checkout(cart: Cart!): Checkout!
  }
`
