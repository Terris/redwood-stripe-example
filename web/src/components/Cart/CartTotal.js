import { useCartTotal } from 'src/components/Cart'
import { currency } from 'src/utils'

export const CartTotal = ({ label }) => {
  const cartTotal = useCartTotal()
  return (
    <div className="cart-total">
      {label && <span className="cart-total-label">{label} </span>}
      <span className="cart-total-total">{currency(cartTotal)}</span>
    </div>
  )
}
