import { useCheckout } from './hooks'

export const Checkout = () => {
  const { checkout } = useCheckout()

  if (!checkout) {
    return <p>Loading...</p>
  }

  return (
    <div className="checkout">
      <h2>Checkout stuff</h2>
    </div>
  )
}
