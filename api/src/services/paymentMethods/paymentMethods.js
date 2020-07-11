import { stripe } from 'src/lib/stripe'

export const paymentMethod = async ({ id }) => {
  const paymentMethod = await stripe.paymentMethods.retrieve(id)
  return castPaymentMethod(paymentMethod)
}

// PRIVATE

const castPaymentMethod = (paymentMethod) => {
  if (paymentMethod.card) {
    paymentMethod.brand = paymentMethod.card.brand
    paymentMethod.last4 = paymentMethod.card.last4
  }
  return paymentMethod
}
