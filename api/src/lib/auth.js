// Define what you want `currentUser` to return throughout your app. For example,
// to return a real user from your database, you could do something like:
//
//   export const getCurrentUser = async ({ email }) => {
//     return await db.user.findOne({ where: { email } })
//   }

import { AuthenticationError } from '@redwoodjs/api'
import { context } from '@redwoodjs/api/dist/globalContext'

export const getCurrentUser = async (jwt) => {
  return jwt
}

export const currentUser = () => context.currentUser

export const requireAuth = () => {
  if (!currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
}

export const requirePermission = (role) => {
  const permitted =
    currentUser &&
    currentUser.app_metadata.roles &&
    currentUser.app_metadata.roles.includes(role)
  if (!permitted) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
}
