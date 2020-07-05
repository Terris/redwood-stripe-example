import gql from 'graphql-tag'

export const schema = gql`
  type Customer {
    id: String!
    email: String
    cartToken: String
  }

  type Query {
    customers: [Customer!]!
    customer(id: String!): Customer!
  }

  input CreateCustomerInput {
    email: String!
  }

  input CreateAnonCustomerInput {
    cartToken: String!
  }

  input UpdateCustomerInput {
    email: String
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer!
    createAnonCustomer(input: CreateAnonCustomerInput!): Customer!
    updateCustomer(id: String!, input: UpdateCustomerInput!): Customer!
    deleteCustomer(id: String!): Customer!
  }
`
