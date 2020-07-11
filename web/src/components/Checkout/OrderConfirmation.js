import { useCheckout } from 'src/components/Checkout'

export const OrderConfirmation = () => {
  const { checkout } = useCheckout()
  return (
    <>
      <h2>Order Confirmation</h2>
      <p>Order details go here.</p>
      <pre>{JSON.stringify(checkout.invoice)}</pre>
    </>
  )
}
