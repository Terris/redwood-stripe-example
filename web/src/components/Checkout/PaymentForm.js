import { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { Form, Label, Submit } from '@redwoodjs/web'

import { CARD_ELEMENT_OPTIONS } from 'src/lib/stripe'
import { useCheckout, PHASE } from 'src/components/Checkout'

export const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { setPayment, setPhase } = useCheckout()
  const [state, setState] = useState({
    loading: false,
    error: null,
  })

  const onSubmit = async () => {
    if (!stripe || !elements) {
      setState({
        ...state,
        error: "Stripe hasn't loaded yet. Please try again.",
        loading: false,
      })
      return
    }
    const cardElement = elements.getElement(CardElement)
    setState({ ...state, error: null, loading: true })
    // create stripe payment method

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })
    if (error) {
      setState({ ...state, error: error.message, loading: false })
    } else {
      setPayment({ paymentMethodId: paymentMethod.id })
      setState({ ...state, loading: false })
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      {state.error && <p className="form-error">{state.error}</p>}
      <h4 style={{ paddingBottom: '0' }}>Payment Method</h4>
      <div className="field">
        <Label>Card</Label>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      <div className="field">
        <button
          className="btn btn-red"
          type="button"
          style={{ marginRight: '1rem' }}
          onClick={() => setPhase(PHASE.SET_SHIPPING)}
        >
          Back to Shipping
        </button>
        <Submit className="btn" disabled={state.loading}>
          Next: Confirm Order
        </Submit>
      </div>
    </Form>
  )
}
