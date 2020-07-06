import { GlobalLayout } from 'src/layouts'
import { Checkout } from 'src/components/Checkout'
import { CartSummary } from 'src/components/Cart'

const CheckoutPage = () => {
  return (
    <GlobalLayout>
      <h1>Checkout</h1>
      <Checkout />
    </GlobalLayout>
  )
}

export default CheckoutPage
