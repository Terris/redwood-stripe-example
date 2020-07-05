import { stripe } from 'src/lib/stripe'
import { product } from 'src/services/products/products'

export const invoice = async ({ id }) => {
  const invoice = await stripe.invoices.retrieve(id)
  return invoice
}

export const createInvoice = async ({ input }) => {
  const invoice = await stripe.invoices.create({
    customer: input.customerId,
    auto_advance: false,
    metadata: {
      syncToken: input.syncToken,
    },
  })
  return invoice
}

export const createInvoiceWithItems = async ({ input }) => {
  const invoiceItems = await createInvoiceItems({
    items: input.cartItems,
    customerId: input.customerId,
  })
  const invoice = await createInvoice({ input, invoiceItems })
  return invoice
}

// PRIVATE

const createInvoiceItems = async ({ items, customerId }) => {
  for (let item of items) {
    await createInvoiceItem({ item, customerId: customerId })
  }
  return true
}

const createInvoiceItem = async ({ item, customerId }) => {
  const priceId = await (await product({ id: item.id })).metadata.priceId
  const invoiceItem = await stripe.invoiceItems.create({
    customer: customerId,
    price: priceId,
    quantity: item.qty,
  })
  return invoiceItem
}
