import { db } from 'src/lib/db'
import { requirePermission } from 'src/lib/auth'

export const users = () => {
  requirePermission('admin')
  return db.user.findMany()
}

export const user = ({ id }) => {
  requirePermission('admin')
  return db.user.findOne({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  requirePermission('admin')
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  requirePermission('admin')
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  requirePermission('admin')
  return db.user.delete({
    where: { id },
  })
}
