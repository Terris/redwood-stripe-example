import { Link, routes } from '@redwoodjs/router'
import Users from 'src/components/Admin/Users'

import { Loader } from 'src/components/UI'

export const QUERY = gql`
  query USERS {
    users {
      id
      email
      authId
      customerId
    }
  }
`

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'cache-and-network' }
}

export const Loading = () => <Loader />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No users yet. '}
      <Link to={routes.adminNewUser()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ users }) => {
  return <Users users={users} />
}
