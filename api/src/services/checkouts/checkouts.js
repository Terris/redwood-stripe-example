import { context } from '@redwoodjs/api/dist/globalContext'

import { userByAuthId, updateUser } from 'src/services/users/users'
import { createCustomer } from 'src/services/customers/customers'
import {
  invoice as getInvoice,
  createInvoiceWithItems,
  syncInvoice,
} from 'src/services/invoices/invoices'
import { createAnonCustomer } from 'src/services/customers/customers'

export const checkout = async ({ input }) => {
  const invoice = input.invoiceId
    ? await getInvoice({ id: input.invoiceId })
    : await createInvoiceWithItems({
        input: {
          cartItems: input.cartItems,
          customerId: await setCustomerId(),
          syncToken: input.syncToken,
        },
      })
  const syncedInvoice = await setSyncedInvoice({
    cartItems: input.cartItems,
    invoice,
    syncToken: input.syncToken,
  })
  return { invoice: syncedInvoice }
}

// PRIVATE

const setSyncedInvoice = async ({ cartItems, invoice, syncToken }) => {
  return syncToken === invoice.syncToken
    ? invoice
    : await syncInvoice({ cartItems, invoice, syncToken })
}

const setCustomerId = async () => {
  const authUser = context.currentUser
  // if there is a current user
  if (authUser) {
    const dbUser = await userByAuthId({ id: authUser.sub })
    // if the db user has a customer id
    if (dbUser.customerId) {
      return dbUser.customerId
    } else {
      // create a new stripe customer
      // and save the customerId to the db user
      const dbUser = await userByAuthId({ id: authUser.sub })
      const customer = await createCustomer({ input: { email: dbUser.email } })
      const user = await updateUser({
        id: dbUser.id,
        input: { customerId: customer.id },
      })
      return user.customerId
    }
  } else {
    // create an anonymous customer
    const anonCustomer = await createAnonCustomer()
    return anonCustomer.id
  }
}
