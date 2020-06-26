import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import { usePermission } from 'src/hooks'

const PrimaryNav = () => (
  <nav>
    <Link to={routes.home()}>Home</Link>
  </nav>
)

const AdminNav = () => (
  <nav className="nav-admin">
    <Link to={routes.admin()}>Admin</Link>
    <Link to={routes.adminUsers()}>Users</Link>
  </nav>
)

const AuthNav = ({ isAuthenticated, logOut }) => {
  return (
    <nav>
      {isAuthenticated ? (
        <button onClick={() => logOut()}>Sign Out</button>
      ) : (
        <>
          <Link to={routes.signUp()}>Sign Up</Link>
          <Link to={routes.signIn()}>Sign In</Link>
        </>
      )}
    </nav>
  )
}

const Header = () => {
  const { isAuthenticated, logOut } = useAuth()
  const { permitted } = usePermission('admin')

  return (
    <header className="header">
      <PrimaryNav />
      {permitted ? <AdminNav /> : null}
      <AuthNav isAuthenticated={isAuthenticated} logOut={logOut} />
    </header>
  )
}

export default Header
