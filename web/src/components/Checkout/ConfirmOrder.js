import { useCheckout } from 'src/components/Checkout'
export const ConfirmOrder = () => {
  const { checkout } = useCheckout()
  return <h2>Confirm Order</h2>
}
