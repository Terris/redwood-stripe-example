export const Checkout = () => {
  // CartContext.setIntent(intentId)
  // check for useCart().paymentIntent

  const intentStates = [
    'requires_payment_method',
    'requires_confirmation',
    'requires_action',
    'processing',
    'succeeded',
    'canceled',
  ]

  return (
    <div className="checkout">
      <h2>Checkout stuff</h2>
    </div>
  )
}
