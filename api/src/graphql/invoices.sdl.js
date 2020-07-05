import gql from 'graphql-tag'

export const schema = gql`
  type Invoice {
    id: String!
    customer: String!
    amount_due: Int
    status: String
    lines: [LineItem!]
  }

  type LineItem {
    id: String!
    amount: Int!
    product: String!
    qty: Int!
  }

  type Query {
    invoices: [Invoice!]!
    invoice(id: String!): Invoice!
  }

  input CreateInvoiceInput {
    customer: String!
  }

  input UpdateInvoiceInput {
    status: String
  }

  type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice!
    updateInvoice(id: String!, input: UpdateInvoiceInput!): Invoice!
    deleteInvoice(id: String!): Invoice!
  }
`
