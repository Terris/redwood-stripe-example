import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const User = ({ user }) => {
  const { addMessage } = useFlash()
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      navigate(routes.adminUsers())
      addMessage('User deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            User {user.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>id</th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th>email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>auth id</th>
              <td>{user.authId}</td>
            </tr>
            <tr>
              <th>stripe customer</th>
              <td>{user.customerId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditUser({ id: user.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(user.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default User
