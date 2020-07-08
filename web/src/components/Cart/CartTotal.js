import { currency } from 'src/utils'

import { useCart } from './CartContext'

export const CartTotal = ({ label }) => {
  const { cart } = useCart()
  return (
    <div className="cart-total">
      {label && <span className="cart-total-label">{label} </span>}
      <span className="cart-total-total">{currency(cart.cartTotal)}</span>
    </div>
  )
}
