import { invoice, mergeInvoiceProducts } from 'src/services/invoices/invoices'

export const order = async ({ id }) => {
  const orderInvoice = await invoice({ id })
  const invoiceWithProducts = await mergeInvoiceProducts({
    invoice: orderInvoice,
  })
  return { id: invoiceWithProducts.id, invoice: invoiceWithProducts }
}
