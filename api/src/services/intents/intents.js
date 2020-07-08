import { stripe } from 'src/lib/stripe'

export const createIntent = ({ input }) => {
  console.log(input)
  const intent = stripe.setupIntents.create({
    confirm: true,
    customer: input.customer,
    payment_method: input.paymentMethodId,
    usage: 'on_session',
  })
  return true
}
