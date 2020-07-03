import { stripe } from 'src/lib/stripe'
import { requirePermission } from 'src/lib/auth'

export const invoice = ({ id }) => {
  return true
}

export const invoices = () => {
  return true
}

export const createInvoice = async ({ input }) => {
  // const invoice = await stripe.invoices.create({
  //   customer: input.customer,
  // })
  // return invoice
  return { id: 0, customer: input.customer }
}

export const updateInvoice = ({ input }) => {
  return true
}

export const deleteInvoice = ({ id }) => {
  return true
}
