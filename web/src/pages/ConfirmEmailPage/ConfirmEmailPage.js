import { useEffect, useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { useParams, Link, routes } from '@redwoodjs/router'
import { GlobalLayout } from 'src/layouts'

const ConfirmEmailPage = () => {
  const { client } = useAuth()
  const { token } = useParams()
  const [loading, setLoading] = useState(false)
  const [confirmationError, setConfirmationError] = useState(null)

  useEffect(() => {
    setLoading(true)
    if (token) {
      client
        .confirm(token)
        .then(() => {
          setConfirmationError(null)
          setLoading(null)
        })
        .catch((error) => {
          setLoading(false)
          setConfirmationError(error.message)
        })
    } else {
      setLoading(false)
    }
  }, [client, token])

  return (
    <GlobalLayout>
      {loading ? (
        <p>Loading...</p>
      ) : confirmationError ? (
        <p>{confirmationError}</p>
      ) : token ? (
        <p>
          Email confirmed. You may now{' '}
          <Link to={routes.signIn()}>sign in.</Link>
        </p>
      ) : (
        <p>Confirmation email sent. Please check your inbox.</p>
      )}
    </GlobalLayout>
  )
}

export default ConfirmEmailPage
