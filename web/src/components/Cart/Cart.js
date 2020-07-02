import { navigate, routes } from '@redwoodjs/router'

import { useCart, CartItem, CartTotal } from 'src/components/Cart'

export const Cart = () => {
  const { cart, clearCart } = useCart()

  if (!cart.length) {
    return <p>Your cart is empty.</p>
  }

  return (
    <>
      {cart && cart.map((item) => <CartItem key={item.id} item={item} />)}
      <div className="cart-footer">
        <CartTotal label="Subtotal:" />
        <div className="cart-footer-actions">
          <button onClick={() => navigate(routes.checkout())}>Checkout</button>{' '}
          <button onClick={() => clearCart()} className="btn-red">
            Clear Cart
          </button>
        </div>
      </div>
    </>
  )
}
