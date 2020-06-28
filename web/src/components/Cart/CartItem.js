import CartItemProductCell from './CartItemProductCell'

export const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <CartItemProductCell id={item.id} />
      <span className="cart-item-qty">{item.qty}</span>
    </div>
  )
}
