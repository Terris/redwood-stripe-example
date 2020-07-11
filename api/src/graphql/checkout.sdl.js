import gql from 'graphql-tag'

export const schema = gql`
  type Checkout {
    customerSource: String
    customer: Customer
    setupIntent: SetupIntent
    paymentMethod: PaymentMethod
    invoice: Invoice
  }

  input SetCustomerInput {
    customerSource: String!
  }

  input SetShippingInput {
    name: String!
    line1: String!
    line2: String!
    city: String!
    state: String!
    postalCode: String!
  }

  input PlaceOrderInput {
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
    setShipping(customerId: String!, input: SetShippingInput!): Checkout!
    setIntent(customerId: String!): Checkout!
    setPayment(paymentMethodId: String!): Checkout!
    placeOrder(input: PlaceOrderInput!): Checkout!
  }
`
