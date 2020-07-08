import { context } from '@redwoodjs/api/dist/globalContext'

import { userByAuthId, reconcileUsersCustomer } from 'src/services/users/users'
import {
  invoice as getInvoice,
  createInvoiceWithItems,
} from 'src/services/invoices/invoices'
import { customer, createAnonCustomer } from 'src/services/customers/customers'

export const checkout = async ({ input }) => {
  const invoice = input.invoiceId
    ? await getInvoice({ id: input.invoiceId })
    : await createInvoiceWithItems({
        input: {
          cartItems: input.cartItems,
          customerId: input.customer.id,
        },
      })
  return {
    invoice,
  }
}

export const setCustomer = async ({ input }) => {
  const customer =
    input.customerSource === 'ANON'
      ? await createAnonCustomer()
      : await setCustomerViaAuth()
  return { customer }
}

// PRIVATE

const setCustomerViaAuth = async () => {
  const authUser = context.currentUser
  if (!authUser) {
    return
  }
  const dbUser = await userByAuthId({ id: authUser.sub })
  if (dbUser.customerId) {
    return await customer({ id: dbUser.customerId })
  } else {
    return await reconcileUsersCustomer({ id: dbUser.id }).customer
  }
}
