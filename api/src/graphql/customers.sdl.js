import gql from 'graphql-tag'

export const schema = gql`
  type Customer {
    id: String!
    email: String
  }

  type Query {
    customers: [Customer!]!
    customer(id: String!): Customer!
  }

  input CreateCustomerInput {
    email: String!
  }

  input UpdateCustomerInput {
    email: String
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer!
    updateCustomer(id: String!, input: UpdateCustomerInput!): Customer!
    deleteCustomer(id: String!): Customer!
  }
`
