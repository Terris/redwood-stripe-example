import { useState, useEffect } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { Form, Label, Submit } from '@redwoodjs/web'

import { CARD_ELEMENT_OPTIONS } from 'src/lib/stripe'
import { useCheckout, PHASE } from 'src/components/Checkout'

import { Loader } from '../UI'

export const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { checkout, setIntent, placeOrder, setPhase } = useCheckout()
  const [state, setState] = useState({
    loading: false,
    error: null,
  })

  useEffect(() => {
    setIntent()
  }, [])

  const onSubmit = async () => {
    if (!stripe || !elements) {
      setState({
        ...state,
        error: "Stripe hasn't loaded yet. Please try again.",
        loading: false,
      })
      return
    }
    setState({ ...state, error: null, loading: true })
    const cardElement = elements.getElement(CardElement)
    // create stripe payment method
    const { error, setupIntent } = await stripe.confirmCardSetup(
      checkout.setupIntent.clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    )
    if (error) {
      setState({ ...state, error: error.message, loading: false })
    } else if (setupIntent.status === 'requires_action') {
      setState({ ...state, loading: true })
    } else {
      setState({ ...state, loading: false })
      placeOrder({ paymentMethodId: setupIntent.payment_method })
    }
  }

  return (
    <Form onSubmit={onSubmit} className="has-block-loader">
      {state.loading && <Loader type="BLOCK" />}
      {state.error && <p className="form-error">{state.error}</p>}
      <h4 style={{ paddingBottom: '0' }}>Payment Method</h4>
      <div className="field">
        <Label>Card</Label>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      <p>Test card: 4242 4242 4242 4242 : 04/24 : 242 : 42424</p>
      <p className="text-small">
        By clicking &ldquo;Next&rdquo; below you authorize BodaciousBots to send
        instructions to the financial institution that issued your card to take
        payment from your account.
      </p>
      <div className="field">
        <button
          className="btn btn-subdued"
          type="button"
          style={{ marginRight: '1rem' }}
          onClick={() => setPhase(PHASE.SET_SHIPPING)}
        >
          Back to Shipping Method
        </button>
        <Submit className="btn" disabled={state.loading}>
          Submit Order and Pay
        </Submit>
      </div>
    </Form>
  )
}
