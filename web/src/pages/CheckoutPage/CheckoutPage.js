import { GlobalLayout } from 'src/layouts'
import { Checkout } from 'src/components/Checkout'
import { CartSummary } from 'src/components/Cart'

const CheckoutPage = () => {
  return (
    <GlobalLayout>
      <h1>Checkout</h1>
      <div className="checkout-page">
        <Checkout />
        <CartSummary />
      </div>
      <ul>
        <li>Check for payment intent</li>
        <li>If no, create payment intent</li>
        <li>If yes, check step</li>
        <li>Sign in or out</li>
        <li>Card Details</li>
        <li>
          States: requires_payment_method, requires_confirmation,
          requires_action, processing, [succeeded, requires_payment_method],
          canceled
        </li>
      </ul>
    </GlobalLayout>
  )
}

export default CheckoutPage
