import gql from 'graphql-tag'

export const schema = gql`
  type Order {
    id: String!
    invoice: Invoice
  }

  type Query {
    orders: [Order!]!
    order(id: String!): Order!
  }
`
