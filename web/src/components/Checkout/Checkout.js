import { CheckoutFlow, CheckoutSummary } from 'src/components/Checkout'

export const Checkout = () => {
  return (
    <div className="checkout">
      <CheckoutFlow />
      <CheckoutSummary />
    </div>
  )
}
