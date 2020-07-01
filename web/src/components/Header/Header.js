import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import { useCart } from 'src/components/Cart'
import { usePermission } from 'src/hooks'

const PrimaryNav = () => (
  <nav>
    <Link to={routes.home()} className="logo">
      BodaciousBots
    </Link>
  </nav>
)

const AdminNav = () => (
  <nav className="nav-admin">
    <Link to={routes.adminUsers()}>Admin Users</Link>
    <Link to={routes.adminProducts()}>Admin Products</Link>
  </nav>
)

const SecondaryNav = ({ isAuthenticated, logOut }) => {
  const { cart } = useCart()
  return (
    <nav>
      <Link to={routes.cart()}>
        Cart
        {cart.length > 0 ? ` (${cart.length})` : null}
      </Link>
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
  const { isAuthenticated, logOut, loading } = useAuth()
  const { permitted } = usePermission('admin')

  return (
    <header className="header">
      <PrimaryNav />
      {!loading && permitted ? <AdminNav /> : null}
      <SecondaryNav isAuthenticated={isAuthenticated} logOut={logOut} />
    </header>
  )
}

export default Header
