import { stripe } from 'src/lib/stripe'
import { product } from 'src/services/products/products'

export const invoice = async ({ id }) => {
  const invoice = await stripe.invoices.retrieve(id)
  return coercedInvoice(invoice)
}

// creates invoice items first then an invoice (per stripe policy)
export const createInvoiceWithItems = async ({ cartItems, customerId }) => {
  const invoiceItems = await createInvoiceItems({
    items: cartItems,
    customerId,
  })
  const invoice = await createInvoice({ customerId, invoiceItems })
  return coercedInvoice(invoice)
}

export const finalizeInvoice = async ({ invoiceId }) => {
  return await stripe.invoices.finalizeInvoice(invoiceId)
}

export const payInvoice = async ({ invoiceId, paymentMethodId }) => {
  return await stripe.invoices.pay(invoiceId, {
    payment_method: paymentMethodId,
  })
}

// PRIVATE

const coercedInvoice = (invoice) => ({
  ...invoice,
  lines: invoice.lines.data.map((line) => ({
    id: line.id,
    amount: line.amount,
    productId: line.price.product,
    qty: line.quantity,
  })),
})

const createInvoice = async ({ customerId }) => {
  const invoice = await stripe.invoices.create({
    customer: customerId,
    auto_advance: false,
  })
  return invoice
}

const createInvoiceItems = async ({ items, customerId }) => {
  for (let item of items) {
    await createInvoiceItem({ item, customerId: customerId })
  }
  return true
}

const createInvoiceItem = async ({ item, customerId, invoiceId }) => {
  const priceId = (await product({ id: item.id })).metadata.priceId
  const invoiceItem = await stripe.invoiceItems.create({
    customer: customerId,
    price: priceId,
    quantity: item.qty,
    invoice: invoiceId,
  })
  return invoiceItem
}
