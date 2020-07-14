import { context } from '@redwoodjs/api/dist/globalContext'

import { userByAuthId, reconcileUsersCustomer } from 'src/services/users/users'
import {
  customer,
  createAnonCustomer,
  setCustomerShipping,
} from 'src/services/customers/customers'
import { createSetupIntent } from 'src/services/setupIntents/setupIntents'
import { paymentMethod } from 'src/services/paymentMethods/paymentMethods'
import {
  createInvoiceWithItems,
  finalizeInvoice,
  payInvoice,
} from 'src/services/invoices/invoices'

// SET CUSTOMER
export const setCustomer = async ({ input }) => {
  const customer =
    input.customerSource === 'ANON'
      ? await createAnonCustomer()
      : await setCustomerViaAuth()
  return { customer }
}

// SET SHIPPING
export const setShipping = async ({ customerId, input }) => {
  const customer = await setCustomerShipping({ id: customerId, input })
  return { customer }
}

// SET INTENT
export const setIntent = async ({ customerId }) => {
  const setupIntent = await createSetupIntent({ customerId })
  return { setupIntent }
}

// SET PAYMENT
export const setPayment = async ({ paymentMethodId }) => {
  const method = await paymentMethod({ id: paymentMethodId })
  return { paymentMethod: method }
}

// PLACE ORDER
export const placeOrder = async ({ input }) => {
  // create invoice with items
  const invoice = await createInvoiceWithItems({
    cartItems: input.cart.cartItems,
    customerId: input.customerId,
  })
  // finalize invoice
  const finalizedInvoice = await finalizeInvoice({ invoiceId: invoice.id })
  // pay invoice
  const paidInvoice = await payInvoice({
    invoiceId: finalizedInvoice.id,
    paymentMethodId: input.paymentMethodId,
  })
  return {
    invoice: paidInvoice,
  }
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
