import { useCart, CartProductCell, CartTotal } from 'src/components/Cart'

export const CartSummary = () => {
  const { cart } = useCart()

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      {cart &&
        cart.map((item) => <CartProductCell key={item.id} id={item.id} />)}
      <CartTotal label="Total:" />
    </div>
  )
}
