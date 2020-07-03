import gql from 'graphql-tag'

export const schema = gql`
  type Invoice {
    id: String!
  }

  type Query {
    invoice: [Invoice!]!
    invoice(id: String!): Invoice!
  }

  input CreateInvoiceInput {
    email: String!
  }

  input UpdateInvoiceInput {
    email: String
  }

  type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice!
    updateInvoice(id: String!, input: UpdateInvoiceInput!): Invoice!
    deleteInvoice(id: String!): Invoice!
  }
`
