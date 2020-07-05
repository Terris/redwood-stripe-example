import { stripe } from 'src/lib/stripe'
import { product } from 'src/services/products/products'

export const invoice = async ({ id }) => {
  const invoice = await stripe.invoices.retrieve(id)
  return coercedInvoice(invoice)
}

// creates invoice items first (per stripe policy)
// then an invoice
export const createInvoiceWithItems = async ({ input }) => {
  const invoiceItems = await createInvoiceItems({
    items: input.cartItems,
    customerId: input.customerId,
  })
  const invoice = await createInvoice({ input, invoiceItems })
  return coercedInvoice(invoice)
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

// PRIVATE

const coercedInvoice = (invoice) => ({
  ...invoice,
  lines: invoice.lines.data.map((line) => ({
    id: line.id,
    amount: line.amount,
    product: line.price.product,
    qty: line.quantity,
  })),
})

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
