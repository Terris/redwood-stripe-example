import { currentUser } from 'src/lib/auth'
import { invoice as getInvoice } from 'src/services/invoices/invoices'
import { createAnonCustomer } from 'src/services/customers/customers'

export const checkout = async ({ id }) => {
  console.log('id ', id)
  let invoice, customer
  if (id) {
    invoice = await getInvoice({ id })
    customer = invoice.customer
  } else {
    console.log('user: ', currentUser)
    // get customer
    // -- if there is no currentUser.customerId
    // -- create anon customer
    // create invoice
  }

  return { id: id || 'test', invoice, customer }
}

export const createCheckout = () => true

export const updateCheckout = () => true
