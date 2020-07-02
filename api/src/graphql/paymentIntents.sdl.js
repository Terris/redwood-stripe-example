import gql from 'graphql-tag'

export const schema = gql`
  type PaymentIntent {
    id: String!
  }

  type Query {
    paymentIntent(id: String!): PaymentIntent!
  }

  input CreatePaymentIntentInput {
    amount: Int!
  }

  input UpdatePaymentIntentInput {
    amount: Int
  }

  type Mutation {
    createPaymentIntent(input: CreatePaymentIntentInput!): PaymentIntent!
    updatePaymentIntent(
      id: String!
      input: UpdatePaymentIntentInput!
    ): PaymentIntent!
    deletePaymentIntent(id: String!): PaymentIntent!
  }
`
