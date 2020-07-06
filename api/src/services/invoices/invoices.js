import { stripe } from 'src/lib/stripe'
import { product } from 'src/services/products/products'

export const invoice = async ({ id }) => {
  const invoice = await stripe.invoices.retrieve(id)
  return coercedInvoice(invoice)
}

// creates invoice items first then an invoice (per stripe policy)
export const createInvoiceWithItems = async ({ input }) => {
  const invoiceItems = await createInvoiceItems({
    items: input.cartItems,
    customerId: input.customerId,
  })
  const invoice = await createInvoice({ input, invoiceItems })
  return coercedInvoice(invoice)
}

export const syncInvoice = async ({ cartItems, invoice, syncToken }) => {
  const invoiceId = invoice.id
  const invoiceItems = invoice.lines
  const memoizedLineItems = []
  // sync existing items (qty) or add new
  for (let cartItem of cartItems) {
    const invoiceItem = invoiceItems.find(
      (invoiceItem) => invoiceItem.productId === cartItem.id
    )
    if (invoiceItem) {
      memoizedLineItems.push(invoiceItem.productId)
      await syncInvoiceItemProps({ cartItem, invoiceItem })
    } else {
      await createInvoiceItem({
        item: cartItem,
        customerId: invoice.customer,
        invoiceId,
      })
    }
  }
  // remove invoice items not in cart
  for (let invoiceItem of invoiceItems) {
    if (memoizedLineItems.indexOf(invoiceItem.productId) === -1) {
      await deleteInvoiceItem(invoiceItem.id)
    }
  }
  // set invoice as synced
  const syncedInvoice = await updateInvoice({
    id: invoice.id,
    input: { syncToken },
  })
  return coercedInvoice(syncedInvoice)
}

// PRIVATE

const coercedInvoice = (invoice) => ({
  ...invoice,
  syncToken: invoice.metadata.syncToken,
  lines: invoice.lines.data.map((line) => ({
    id: line.id,
    amount: line.amount,
    productId: line.price.product,
    qty: line.quantity,
  })),
})

const createInvoice = async ({ input }) => {
  const invoice = await stripe.invoices.create({
    customer: input.customerId,
    auto_advance: false,
    metadata: {
      syncToken: input.syncToken,
    },
  })
  return invoice
}

const updateInvoice = async ({ id, input }) => {
  return stripe.invoices.update(id, {
    metadata: { syncToken: input.syncToken },
  })
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

const updateInvoiceItem = async ({ id, input }) =>
  stripe.invoiceItems.update(id, { quantity: input.quantity })

const syncInvoiceItemProps = async ({ cartItem, invoiceItem }) => {
  return cartItem.qty === invoiceItem.qty
    ? true
    : await updateInvoiceItem({
        id: invoiceItem.id,
        input: { quantity: cartItem.qty },
      })
}

const deleteInvoiceItem = async (id) => await stripe.invoiceItems.del(id)
