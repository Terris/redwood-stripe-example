import { stripe } from 'src/lib/stripe'
import { requirePermission } from 'src/lib/auth'

export const products = async () => {
  const products = await stripe.products.list()
  const productsWithPrices = products.data.map((product) => {
    return {
      price: product.metadata.price,
      ...product,
    }
  })
  return productsWithPrices
}

export const product = async ({ id }) => {
  const product = await stripe.products.retrieve(id)
  const productWithPrice = {
    price: product.metadata.price,
    ...product,
  }
  return productWithPrice
}

export const createProduct = async ({ input }) => {
  requirePermission('admin')
  const product = await stripe.products.create({
    name: input.name,
    description: input.description,
    type: 'good',
  })
  const price = await stripe.prices.create({
    unit_amount: input.price,
    currency: 'usd',
    product: product.id,
  })
  const productWithPrice = await updateProductPrice({
    id: product.id,
    price: price,
  })
  return productWithPrice
}

export const updateProduct = async ({ id, input }) => {
  requirePermission('admin')
  const product = await stripe.products.update(id, {
    name: input.name,
    description: input.description,
  })
  const price = await stripe.prices.update(product.metadata.price, {
    unit_amount: input.price,
  })
  const productWithPrice = await updateProductPrice({
    id: product.id,
    price: price.unit_amount,
  })
  return productWithPrice
}

export const updateProductPrice = async ({ id, price }) => {
  requirePermission('admin')
  const product = await stripe.products.update(id, {
    metadata: {
      price_id: price.id,
      price: price.unit_amount,
    },
  })
  return product
}

export const deleteProduct = async ({ id }) => {
  requirePermission('admin')
  const product = await stripe.products.del(id)
  return product
}
