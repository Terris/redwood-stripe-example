import { useEffect, useState } from 'react'
import { useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

export const usePermission = (role) => {
  const { pathname } = useLocation()
  const { loading, currentUser } = useAuth()
  const [permitted, setPermitted] = useState(true)

  useEffect(() => {
    // set permitted
    setPermitted(currentUser.app_metadata.roles.includes(role))
  }, [pathname, currentUser, role])

  return { loading, permitted }
}
