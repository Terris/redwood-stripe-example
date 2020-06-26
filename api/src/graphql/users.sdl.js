import gql from 'graphql-tag'

export const schema = gql`
  type User {
    id: Int!
    email: String!
    authId: String!
    customerId: String!
    customer: Customer
  }

  type Query {
    users: [User!]!
    user(id: Int!): User!
  }

  input CreateUserInput {
    email: String!
    authId: String!
    customerId: String
  }

  input UpdateUserInput {
    email: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: Int!, input: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
  }
`
