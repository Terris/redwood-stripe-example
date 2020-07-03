import gql from 'graphql-tag'

export const schema = gql`
  type Invoice {
    id: String!
    customer: String!
    description: String
  }

  type Query {
    invoices: [Invoice!]!
    invoice(id: String!): Invoice!
  }

  input CreateInvoiceInput {
    customer: String!
  }

  input UpdateInvoiceInput {
    description: String
  }

  type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice!
    updateInvoice(id: String!, input: UpdateInvoiceInput!): Invoice!
    deleteInvoice(id: String!): Invoice!
  }
`
