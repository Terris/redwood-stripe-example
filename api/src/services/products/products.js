import { stripe } from 'src/lib/stripe'
import { requirePermission } from 'src/lib/auth'

export const products = async () => {
  const products = await stripe.products.list()
  return products.data
}

export const product = async ({ id }) => {
  const product = await stripe.products.retrieve(id)
  return product
}

export const createProduct = async ({ input }) => {
  requirePermission('admin')
  const product = await stripe.products.create({
    name: input.name,
    description: input.description,
    type: 'good',
  })
  return product
}

export const updateProduct = async ({ id, input }) => {
  requirePermission('admin')
  const product = await stripe.products.update(id, {
    name: input.name,
    description: input.description,
  })
  return product
}

export const deleteProduct = async ({ id }) => {
  requirePermission('admin')
  const product = await stripe.products.del(id)
  return product
}
