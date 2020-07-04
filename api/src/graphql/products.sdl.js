import gql from 'graphql-tag'

export const schema = gql`
  type Product {
    id: String!
    name: String!
    description: String
    unitAmount: Int!
    priceId: String!
    images: [String!]
  }

  type Query {
    products: [Product!]!
    product(id: String!): Product!
  }

  input CreateProductInput {
    name: String!
    description: String
    unitAmount: Int!
    images: [String!]
  }

  input UpdateProductInput {
    name: String!
    description: String
    unitAmount: Int
    images: [String!]
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: String!, input: UpdateProductInput!): Product!
    deleteProduct(id: String!): Product!
  }
`
