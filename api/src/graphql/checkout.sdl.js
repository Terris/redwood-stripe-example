import gql from 'graphql-tag'

export const schema = gql`
  type Checkout {
    customer: Customer
    invoice: Invoice
    customerSource: String
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

  input SetCheckoutCustomerInput {
    customerSource: String!
  }

  type Mutation {
    setCheckoutCustomer(input: SetCheckoutCustomerInput!): Checkout!
  }
`
