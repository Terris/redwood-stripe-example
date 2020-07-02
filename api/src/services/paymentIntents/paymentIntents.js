import { stripe } from 'src/lib/stripe'
import { requirePermission } from 'src/lib/auth'

export const paymentIntent = async ({ id }) => {
  return true
}

export const createPaymentIntent = async ({ input }) => {
  return true
}

export const updatePaymentIntent = async ({ id, input }) => {
  return true
}

export const deletePaymentIntent = async ({ id }) => {
  return true
}
