import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

import { AdminLayout } from 'src/layouts'

const UsersLayout = (props) => {
  return (
    <AdminLayout>
      <div className="rw-scaffold">
        <Flash timeout={3000} />
        <header className="rw-header">
          <h1 className="rw-heading rw-heading-primary">
            <Link to={routes.adminUsers()} className="rw-link">
              Users
            </Link>
          </h1>
        </header>
        <main className="rw-main">{props.children}</main>
      </div>
    </AdminLayout>
  )
}

export default UsersLayout
