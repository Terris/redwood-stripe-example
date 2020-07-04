import { AuthenticationError } from '@redwoodjs/api'
import { context } from '@redwoodjs/api/dist/globalContext'

export const requireAuth = () => {
  const user = context.currentUser
  if (!user) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
}

export const requirePermission = (role) => {
  const user = context.currentUser
  const permitted =
    user && user.app_metadata.roles && user.app_metadata.roles.includes(role)
  if (!permitted) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
}
