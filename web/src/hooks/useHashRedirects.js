import { useEffect } from 'react'
import { routes, navigate, useLocation } from '@redwoodjs/router'

const HASH_REDIRECTS = [
  {
    hash: 'confirmation_token',
    route: (token) => routes.confirmEmail({ token }),
  },
  {
    hash: 'recovery_token',
    route: (token) => routes.resetPassword({ token }),
  },
]

export const useHashRedirects = () => {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      for (let redirect of HASH_REDIRECTS) {
        if (hash.includes(redirect.hash)) {
          let token = hash.slice(hash.indexOf('=') + 1)
          navigate(redirect.route(token))
        }
      }
    }
  }, [hash])
}
