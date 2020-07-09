import gql from 'graphql-tag'

export const schema = gql`
  type Checkout {
    customer: Customer
    paymentIntent: PaymentIntent
    invoice: Invoice
    customerSource: String
  }

  type PaymentIntent {
    clientSecret: String!
    status: String!
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

  input SetCustomerInput {
    customerSource: String!
  }

  input SetPaymentInput {
    customerId: String!
    paymentMethodId: String!
  }

  type Mutation {
    setCustomer(input: SetCustomerInput!): Checkout!
    setPayment(input: SetPaymentInput!): Checkout!
  }
`
