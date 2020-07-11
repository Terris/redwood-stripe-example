import gql from 'graphql-tag'

export const schema = gql`
  type SetupIntent {
    clientSecret: String!
    status: String!
  }
`
