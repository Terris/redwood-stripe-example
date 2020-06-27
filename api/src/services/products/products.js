import { stripe } from 'src/lib/stripe'
import { requirePermission } from 'src/lib/auth'

export const products = async () => {
  const products = await stripe.products.list()
  const productsWithUnitAmount = products.data.map((product) => {
    return {
      unitAmount: product.metadata.unit_amount,
      ...product,
    }
  })
  return productsWithUnitAmount
}

export const product = async ({ id }) => {
  const product = await stripe.products.retrieve(id)
  const productWithUnitAmount = {
    unitAmount: product.metadata.unit_amount,
    ...product,
  }
  return productWithUnitAmount
}

export const createProduct = async ({ input }) => {
  requirePermission('admin')
  const product = await stripe.products.create({
    name: input.name,
    description: input.description,
    type: 'good',
    metadata: {
      unit_amount: input.unitAmount,
    },
  })
  const price = await createPrice({
    productId: product.id,
    unitAmount: input.unitAmount,
  })
  const productWithUnitAmount = {
    unitAmount: price.unit_amount,
    ...product,
  }
  return productWithUnitAmount
}

export const updateProduct = async ({ id, input }) => {
  requirePermission('admin')
  const product = await stripe.products.update(id, {
    name: input.name,
    description: input.description,
  })
  if (shouldUpdatePrice({ productId: id, unitAmount: input.unitAmount })) {
    return updateProductPrice({ productId: id, unitAmount: input.unitAmount })
  }
  const productWithUnitAmount = {
    unitAmount: product.metadata.unit_amount,
    ...product,
  }
  return productWithUnitAmount
}

// TODO
// products can't be deleted
// they must be archived
export const deleteProduct = async ({ id }) => {
  requirePermission('admin')
  const product = await stripe.products.del(id)
  return product
}

// PRIVATE

const createPrice = async ({ productId, unitAmount }) => {
  const price = await stripe.prices.create({
    unit_amount: unitAmount,
    currency: 'usd',
    product: productId,
    lookup_key: productId,
    transfer_lookup_key: true,
  })
  return price
}

const shouldUpdatePrice = async ({ productId, unitAmount }) => {
  const product = await product({ productId })
  return product.metadata.unit_amount !== unitAmount
}

const updateProductPrice = async ({ productId, unitAmount }) => {
  requirePermission('admin')
  // update the product meta data
  // where we "cache" unitAmount
  const product = await stripe.products.update(productId, {
    metadata: {
      unit_amount: unitAmount,
    },
  })
  // Stripe Price unit_amount can't be updated
  // so we create a new Price
  // and transfer the lookup_key (productId)
  const price = await createPrice({ productId, unitAmount })

  const productWithUnitAmount = {
    unitAmount: price.unit_amount,
    ...product,
  }
  return productWithUnitAmount
}
