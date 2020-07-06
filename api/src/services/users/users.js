import { db } from 'src/lib/db'
import { requirePermission } from 'src/lib/auth'

import {
  updateCustomer,
  createCustomer,
  customer,
} from '../customers/customers'

export const users = async () => {
  //requirePermission('admin')
  const users = await db.user.findMany()
  const usersWithCustomer = users.map((user) => {
    const userCustomer = customer({ id: user.customerId })
    return {
      customer: userCustomer,
      ...user,
    }
  })
  return usersWithCustomer
}

export const user = async ({ id }) => {
  const user = await db.user.findOne({
    where: { id },
  })
  const userWithCustomer = {
    customer: await customer({ id: user.customerId }),
    ...user,
  }
  return userWithCustomer
}

export const userByAuthId = async ({ id }) => {
  const user = await db.user.findOne({
    where: { authId: id },
  })
  return user
}

export const createUser = async ({ input }) => {
  // create a stripe customer
  const customer = await createCustomer({ input: { email: input.email } })
  // then create the db user with stripe customer id
  return db.user.create({
    data: {
      customerId: customer.id,
      ...input,
    },
  })
}

export const updateUser = async ({ id, input }) => {
  requirePermission('admin')
  const user = await db.user.update({
    data: input,
    where: { id },
  })
  const customer = await updateCustomer({
    id: user.customerId,
    input: { email: input.email },
  })
  const userWithCustomer = {
    customer: customer,
    ...user,
  }
  return userWithCustomer
}

export const deleteUser = async ({ id }) => {
  requirePermission('Gandalf')
  return db.user.delete({
    where: { id },
  })
}
