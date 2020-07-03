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
    </GlobalLayout>
  )
}

export default CheckoutPage
