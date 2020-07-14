import { invoice, mergeInvoiceProducts } from 'src/services/Invoices/Invoices'

export const order = async ({ id }) => {
  const orderInvoice = await invoice({ id })
  const invoiceWithProducts = await mergeInvoiceProducts({ orderInvoice })
  return { id, invoice: invoiceWithProducts }
}