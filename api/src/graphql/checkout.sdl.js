import gql from 'graphql-tag'

export const schema = gql`
  type Checkout {
    customer: Customer
    paymentIntent: PaymentIntent
    invoice: Invoice
    customerSource: String
  }

  input SetCustomerInput {
    customerSource: String!
  }

  input FinalizeWithPaymentInput {
    customerId: String!
    paymentMethodId: String!
    cart: CartInput!
  }

  input CartInput {
    cartTotal: Int!
    cartItems: [CartItemInput!]
  }

  input CartItemInput {
    id: String!
    name: String
    description: String
    qty: Int!
    priceId: String!
    unitAmount: Int!
    images: [String!]
  }

  type Mutation {
    setCustomer(input: SetCustomerInput!): Checkout!
    finalizeWithPayment(input: FinalizeWithPaymentInput!): Checkout!
  }
`
