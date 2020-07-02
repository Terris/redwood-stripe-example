import { useCart, CartProductCell } from 'src/components/Cart'

export const CartItem = ({ item }) => {
  const { updateItemQty, deleteItem } = useCart()

  const onChange = (e) => {
    const qty = parseInt(e)
    if (qty < 0) {
      updateItemQty({ id: item.id, qty: 0 })
    } else {
      updateItemQty({ id: item.id, qty: qty })
    }
  }

  return (
    <div className="cart-item">
      <CartProductCell id={item.id} />
      <div className="cart-item-tools">
        <div className="cart-item-qty">
          Quantity:
          <input
            name="qty"
            type="number"
            min="0"
            value={item.qty || ''}
            className="cart-item-qty-field"
            onChange={(e) => onChange(e.currentTarget.value)}
          />
        </div>
        <button onClick={() => deleteItem({ id: item.id })} className="btn-red">
          Remove
        </button>
      </div>
    </div>
  )
}
