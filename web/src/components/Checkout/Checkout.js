import { Loader } from 'src/components/UI'
import { CheckoutSummary } from 'src/components/Checkout'

import { useCheckout } from './hooks'

export const Checkout = () => {
  const { checkout, loading, error } = useCheckout()

  if (loading) {
    return <Loader message="Preparing your order." />
  }

  if (error) {
    return <p className="text-error">{error.message}</p>
  }

  return (
    <div className="checkout">
      <div className="checkout-flow">
        <h2>Steps Here</h2>
      </div>
      <CheckoutSummary checkout={checkout} />
    </div>
  )
}
