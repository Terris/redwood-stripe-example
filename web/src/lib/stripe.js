import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

export const CARD_ELEMENT_OPTIONS = {
  classes: {
    base: 'stripe-input',
    focus: 'stripe-input-focus',
  },
  style: {
    base: {
      color: '#444',
      fontFamily: 'sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
}
