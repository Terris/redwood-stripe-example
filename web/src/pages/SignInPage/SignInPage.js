import { Link, routes, navigate } from '@redwoodjs/router'

import { GlobalLayout } from 'src/layouts'
import { useSignIn, SignInForm } from 'src/components/SignIn'

const SignInPage = () => {
  const { onSubmit, loading, error } = useSignIn({
    onComplete: () => navigate(routes.home()),
  })

  return (
    <GlobalLayout>
      <h1>Sign In</h1>
      <SignInForm onSubmit={onSubmit} loading={loading} error={error} />
      <p>
        <Link to={routes.forgotPassword()}>Forgot password?</Link>
      </p>
      <h4 style={{ paddingBottom: 0 }}>Demo Credentials:</h4>
      <p>
        <strong>email:</strong> admin@example.com
        <br />
        <strong>pass:</strong> password
      </p>
    </GlobalLayout>
  )
}

export default SignInPage
