import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'

export const useSignIn = ({ onComplete } = { onComplete: () => null }) => {
  const { logIn } = useAuth()
  const [state, setState] = useState({
    error: null,
    loading: false,
  })

  const onSubmit = (data) => {
    setState({ error: null, loading: true })
    logIn({ email: data.email, password: data.password, remember: true })
      .then(() => onComplete())
      .catch((error) => setState({ error: error.message, loading: false }))
  }

  return {
    onSubmit,
    error: state.error,
    loading: state.loading,
  }
}
