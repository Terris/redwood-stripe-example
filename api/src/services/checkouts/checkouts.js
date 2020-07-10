import { context } from '@redwoodjs/api/dist/globalContext'

import { createSetupIntent } from 'src/services/paymentIntents/paymentIntents'
import { userByAuthId, reconcileUsersCustomer } from 'src/services/users/users'
import {
  invoice as getInvoice,
  createInvoiceWithItems,
  finalizeInvoice,
  payInvoice,
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

export const finalizeWithPayment = async ({ input }) => {
  // setup intent
  const setupIntent = await createSetupIntent({ input })
  // create invoice with items
  const invoice = await createInvoiceWithItems({
    cartItems: input.cart.cartItems,
    customerId: input.customerId,
    setupIntent,
  })
  // finalize invoice
  const finalizedInvoice = await finalizeInvoice({ invoiceId: invoice.id })
  // pay invoice
  const paidInvoice = await payInvoice({
    invoiceId: finalizedInvoice.id,
    paymentMethodId: input.paymentMethodId,
  })
  const checkout = {
    invoice: paidInvoice,
  }
  return checkout
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
