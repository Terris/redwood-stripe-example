import { useCart, CartProductCell, CartTotal } from 'src/components/Cart'

export const CartSummary = () => {
  const { cart } = useCart()

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      {cart.cartItems &&
        cart.cartItems.map((item) => (
          <div key={item.id} className="cart-summary-item">
            <div className="cart-summary-item-qty">{item.qty} x</div>
            <CartProductCell id={item.id} item={item} />
          </div>
        ))}
      <CartTotal label="Total:" />
    </div>
  )
}
