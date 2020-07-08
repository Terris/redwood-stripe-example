import { GlobalLayout } from 'src/layouts'
import { CheckoutProvider, Checkout } from 'src/components/Checkout'

const CheckoutPage = () => {
  return (
    <GlobalLayout>
      <h1>Checkout</h1>
      <CheckoutProvider>
        <Checkout />
      </CheckoutProvider>
    </GlobalLayout>
  )
}

export default CheckoutPage
