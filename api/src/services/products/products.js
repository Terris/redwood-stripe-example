import { stripe } from 'src/lib/stripe'
import { requirePermission } from 'src/lib/auth'

export const products = async () => {
  const products = await stripe.products.list()
  const productsWithPrice = products.data.map((product) => {
    return {
      unitAmount: product.metadata.unitAmount,
      priceId: product.metadata.priceId,
      ...product,
    }
  })
  return productsWithPrice
}

export const product = async ({ id }) => {
  const product = await stripe.products.retrieve(id)
  const productWithPrice = {
    unitAmount: product.metadata.unitAmount,
    priceId: product.metadata.priceId,
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
    images: input.images,
  })
  const productWithPrice = await setProductPrice({
    productId: product.id,
    unitAmount: input.unitAmount,
  })
  return productWithPrice
}

export const updateProduct = async ({ id, input }) => {
  requirePermission('admin')
  const product = await stripe.products.update(id, {
    name: input.name,
    description: input.description,
    images: input.images && input.images[0] ? input.images : null,
  })
  // if unitAmount has changed update Price
  if (parseInt(product.metadata.unitAmount) !== input.unitAmount) {
    return setProductPrice({ productId: id, unitAmount: input.unitAmount })
  }
  const productWithPrice = {
    unitAmount: product.metadata.unitAmount,
    priceId: product.metadata.priceId,
    ...product,
  }
  return productWithPrice
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

const setProductPrice = async ({ productId, unitAmount }) => {
  requirePermission('admin')
  // Stripe Price unit_amount can't be updated
  // so we create a new Price
  // and transfer the lookup_key (productId)
  const price = await createPrice({ productId, unitAmount })
  // update the product meta data
  // where we "cache" unitAmount & priceId
  const product = await stripe.products.update(productId, {
    metadata: {
      unitAmount: unitAmount,
      priceId: price.id,
    },
  })
  const productWithPrice = {
    unitAmount: price.unit_amount,
    priceId: price.id,
    ...product,
  }
  return productWithPrice
}
