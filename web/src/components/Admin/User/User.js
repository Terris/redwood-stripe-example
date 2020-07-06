import { Link, routes, navigate } from '@redwoodjs/router'

const User = ({ user }) => {
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
      </nav>
    </>
  )
}

export default User
