import { context } from '@redwoodjs/api/dist/globalContext'

import { userByAuthId } from 'src/services/users/users'
import { createCustomer } from 'src/services/customers/customers'
import {
  invoice as getInvoice,
  createInvoiceWithItems,
} from 'src/services/invoices/invoices'
import { createAnonCustomer } from 'src/services/customers/customers'

export const checkout = async ({ input }) => {
  let invoice, customerId
  if (input.invoiceId) {
    invoice = await getInvoice({ id: input.invoiceId })
    customerId = invoice.customer
  } else {
    customerId = await setCustomerId()
    invoice = await createInvoiceWithItems({
      input: { cartItems: input.cartItems, customerId },
    })
  }
  return { invoiceId: invoice.id, invoice, customerId }
}

// PRIVATE

const setCustomerId = async () => {
  let customer
  const authUser = context.currentUser
  // if there is a current user
  if (authUser) {
    const dbUser = await userByAuthId({ id: authUser.sub })
    // if the current user has a stripe customer id
    if (dbUser.customerId) {
      customer = dbUser.customerId
    } else {
      // create a new stripe customer
      customer = await createCustomer({ input: { email: dbUser.email } }).id
    }
    // if there is a customer with currentUser.email
  } else {
    // create an anonymous customer
    customer = await createAnonCustomer({ input: { cartToken: 'test' } }).id
  }
  return customer
}
