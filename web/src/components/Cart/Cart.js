import { useEffect, useState } from 'react'

import { currency } from 'src/utils'

import { useCart } from './CartContext'
import { CartItem } from './CartItem'

export const Cart = () => {
  const { cart, depPoll } = useCart()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const cartReducer = cart.reduce(
      (acc, item) => acc + item.qty * item.unitAmount,
      0
    )
    setTotal(cartReducer)
  }, [cart, depPoll])

  if (!cart.length) {
    return <p>Your cart is empty.</p>
  }

  return (
    <>
      {cart && cart.map((item) => <CartItem key={item.id} item={item} />)}
      <div className="cart-footer">
        <div className="cart-footer-total">
          <p>Subtotal: {currency(total)}</p>
        </div>
        <div className="cart-footer-actions">
          <button>Checkout</button>{' '}
          <button onClick={() => clearCart()} className="btn-red">
            Clear Cart
          </button>
        </div>
      </div>
    </>
  )
}
