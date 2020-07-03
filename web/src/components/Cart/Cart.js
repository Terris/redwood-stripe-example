import { navigate, routes } from '@redwoodjs/router'

import { useCart, CartItem, CartTotal } from 'src/components/Cart'

export const Cart = () => {
  const { cart, clearCartItems } = useCart()

  if (!cart.cartItems.length) {
    return <p>Your cart is empty.</p>
  }

  return (
    <>
      {cart.cartItems &&
        cart.cartItems.map((item) => <CartItem key={item.id} item={item} />)}
      <div className="cart-footer">
        <CartTotal label="Subtotal:" />
        <div className="cart-footer-actions">
          <button onClick={() => navigate(routes.checkout())}>Checkout</button>{' '}
          <button onClick={() => clearCartItems()} className="btn-red">
            Clear Cart
          </button>
        </div>
      </div>
    </>
  )
}
