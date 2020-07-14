import { stripe } from 'src/lib/stripe'
import { invoice, mergeInvoiceProducts } from 'src/services/invoices/invoices'

export const orders = async () => {
  const invoices = await stripe.invoices.list()
  const orders = invoices.data.map((invoice) => ({
    id: invoice.id,
    invoice: { ...invoice },
  }))
  return orders
}

export const order = async ({ id }) => {
  const orderInvoice = await invoice({ id })
  const invoiceWithProducts = await mergeInvoiceProducts({
    invoice: orderInvoice,
  })
  return { id: invoiceWithProducts.id, invoice: invoiceWithProducts }
}
