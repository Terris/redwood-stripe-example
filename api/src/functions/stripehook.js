import { stripe } from 'src/lib/stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export const handler = async (event) => {
  // Only allow POST method
  if (event.httpMethod !== 'POST') {
    return { statusCode: 404 }
  }

  // Check signing signature
  const sig = event.headers['stripe-signature']
  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret)
  } catch (err) {
    // On error, log and return the error message
    // console.log(`Webhook Error message: ${err.message}`)
    return {
      statusCode: 400,
      body: `Event Error: ${err.message}`,
    }
  }

  // Successfully constructed event
  // console.log('Webhook Success:', stripeEvent.id)

  return {
    statusCode: 200,
    body: `Event Success: ${stripeEvent.id}`,
  }
}
