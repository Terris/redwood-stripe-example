import { useAuth } from '@redwoodjs/auth'

import { useCart } from 'src/components/Cart'

export const Checkout = () => {
  const { invoiceId } = useCart()

  const doCheckout = async () => {
    if (invoiceId) {
      // check cart sync
    } else {
      // create cart
    }
  }

  return (
    <div className="checkout">
      <h2>Checkout stuff</h2>
      <p>
        <button onClick={() => doCheckout()}>DO CHECKOUT</button>
      </p>
    </div>
  )
}
