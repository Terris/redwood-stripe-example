import { useCart } from 'src/components/Cart'

import { CartItem } from './CartItem'

export const Cart = () => {
  const { cart } = useCart()
  if (!cart.length) {
    return <p>Your cart is empty.</p>
  }
  return (
    <>
      {cart && cart.map((item) => <CartItem key={item.id} item={item} />)}
      <div className="cart-totals-row">TOTAL HERE</div>
    </>
  )
}
