import { Elements } from '@stripe/react-stripe-js'

import { stripePromise } from 'src/lib/stripe'
import { CheckoutForm } from 'src/components/Checkout'

export const SetPaymentMethod = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
)
