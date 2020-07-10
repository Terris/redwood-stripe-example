import { stripe } from 'src/lib/stripe'

export const createSetupIntent = async ({ input }) => {
  const intent = await stripe.setupIntents.create({
    confirm: true,
    customer: input.customerId,
    payment_method: input.paymentMethodId,
    usage: 'on_session',
  })
  return intent
}
