import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const GlobalLayout = ({ children }) => {
  const { isAuthenticated, logOut } = useAuth()

  return (
    <>
      <header>
        <nav>
          <Link to={routes.home()}>Home</Link>
          {isAuthenticated ? (
            <button onClick={() => logOut()}>Sign Out</button>
          ) : (
            <>
              <Link to={routes.signUp()}>Sign Up</Link>
              <Link to={routes.signIn()}>Sign In</Link>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default GlobalLayout
