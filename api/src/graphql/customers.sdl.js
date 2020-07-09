import gql from 'graphql-tag'

export const schema = gql`
  type Customer {
    id: String!
    email: String
    shipping: Shipping
  }

  type Shipping {
    name: String
    address: Address
  }

  type Address {
    name: String
    line1: String!
    line2: String!
    city: String!
    state: String!
    postalCode: String!
  }

  type Query {
    customers: [Customer!]!
    customer(id: String!): Customer!
  }

  input CreateCustomerInput {
    email: String!
  }

  input CreateAnonCustomerInput {
    id: String
  }

  input UpdateCustomerInput {
    email: String
  }

  input SetShippingInput {
    name: String!
    line1: String!
    line2: String!
    city: String!
    state: String!
    postalCode: String!
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer!
    createAnonCustomer(input: CreateAnonCustomerInput!): Customer!
    updateCustomer(id: String!, input: UpdateCustomerInput!): Customer!
    setShipping(id: String!, input: SetShippingInput!): Customer!
    deleteCustomer(id: String!): Customer!
  }
`
