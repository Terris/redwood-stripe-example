import { navigate, routes, Link } from '@redwoodjs/router'

import { useCart, CartItem, CartTotal } from 'src/components/Cart'

export const Cart = () => {
  const { cart, clearCartItems } = useCart()

  if (!cart.cartItems.length) {
    return (
      <p>
        Your cart is empty. <Link to={routes.home()}>Continue shopping.</Link>
      </p>
    )
  }

  return (
    <>
      {cart.cartItems &&
        cart.cartItems.map((item) => <CartItem key={item.id} item={item} />)}
      <div className="cart-footer">
        <CartTotal label="Subtotal:" />
        <div className="cart-footer-actions">
          <button onClick={() => navigate(routes.checkout())}>Checkout</button>{' '}
          <button onClick={() => clearCartItems()} className="btn-subdued">
            Clear Cart
          </button>
        </div>
      </div>
    </>
  )
}
