import User from 'src/components/Admin/User'

import { Loader } from 'src/components/UI'

export const QUERY = gql`
  query FIND_USER_BY_ID($id: Int!) {
    user: user(id: $id) {
      id
      email
      authId
      customerId
    }
  }
`

export const Loading = () => <Loader />

export const Empty = () => <div>User not found</div>

export const Success = ({ user }) => {
  return <User user={user} />
}
