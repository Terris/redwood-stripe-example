import { context } from '@redwoodjs/api/dist/globalContext'

import { userByAuthId, updateUser } from 'src/services/users/users'
import { createCustomer } from 'src/services/customers/customers'
import {
  invoice as getInvoice,
  createInvoiceWithItems,
} from 'src/services/invoices/invoices'
import { createAnonCustomer } from 'src/services/customers/customers'

export const checkout = async ({ input }) => {
  let invoice
  if (input.invoiceId) {
    invoice = await getInvoice({ id: input.invoiceId })
  } else {
    invoice = await createInvoiceWithItems({
      input: { cartItems: input.cartItems, customerId: await setCustomerId() },
    })
  }
  return { invoiceId: invoice.id, invoice }
}

// PRIVATE

const setCustomerId = async () => {
  const authUser = context.currentUser
  // if there is a current user
  if (authUser) {
    const dbUser = await userByAuthId({ id: authUser.sub })
    // if the current user has a stripe customer id
    if (dbUser.customerId) {
      return dbUser.customerId
    } else {
      const dbUser = await userByAuthId({ id: authUser.sub })
      // create a new stripe customer
      const customer = await createCustomer({ input: { email: dbUser.email } })
      // and save the customerId to the db user
      const user = await updateUser({
        id: dbUser.id,
        input: { customerId: customer.id },
      })
      return user.customerId
    }
    // if there is a customer with currentUser.email
  } else {
    // create an anonymous customer
    const anonCustomer = await createAnonCustomer()
    return anonCustomer.id
  }
}
