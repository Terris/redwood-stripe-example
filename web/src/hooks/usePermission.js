import { useEffect, useState } from 'react'
import { useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

export const usePermission = (role) => {
  const { pathname } = useLocation()
  const { loading, currentUser } = useAuth()
  const [permitted, setPermitted] = useState(false)

  useEffect(() => {
    // set permitted
    setPermitted(
      currentUser &&
        currentUser.app_metadata.roles &&
        currentUser.app_metadata.roles.includes(role)
    )
  }, [pathname, currentUser, role])

  return { loading, permitted }
}
