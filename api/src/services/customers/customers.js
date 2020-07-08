import { stripe } from 'src/lib/stripe'
import { requirePermission } from 'src/lib/auth'

export const customers = async () => {
  requirePermission('admin')
  const customers = stripe.customers.list()
  return customers
}

export const customer = async ({ id }) => {
  requirePermission('admin')
  const customer = await stripe.customers.retrieve(id)
  customer.cartToken = customer.metadata.cartToken || null
  return customer
}

export const createCustomer = async ({ input }) => {
  const customer = await stripe.customers.create({
    email: input.email,
  })
  return customer
}

export const createAnonCustomer = async () => {
  const customer = await stripe.customers.create()
  return customer
}

export const setShipping = async ({ id, input }) => {
  const customer = await stripe.customers.update(id, {
    shipping: {
      name: input.name,
      address: {
        line1: input.line1,
        line2: input.line2,
        city: input.city,
        state: input.state,
        postal_code: input.postalCode,
      },
    },
  })
  return customer
}

export const updateCustomer = async ({ id, input }) => {
  requirePermission('admin')
  const customer = await stripe.customers.update(id, {
    email: input.email,
  })
  return customer
}

export const deleteCustomer = async ({ id }) => {
  requirePermission('admin')
  const customer = await stripe.customers.del(id)
  return customer
}
