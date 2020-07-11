import { stripe } from 'src/lib/stripe'

export const createSetupIntent = async ({ customerId }) => {
  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
    usage: 'on_session',
  })
  return castSetupIntent(setupIntent)
}

// PRIVATE

const castSetupIntent = (setupIntent) => {
  setupIntent.clientSecret = setupIntent.client_secret
  return setupIntent
}
