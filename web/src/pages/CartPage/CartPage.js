import { GlobalLayout } from 'src/layouts'
import { Cart } from 'src/components/Cart'
import { useCart } from 'src/components/Cart'

const CartPage = () => {
  const { addItem, clearCart } = useCart()
  return (
    <GlobalLayout>
      <h1>Cart</h1>
      <Cart />
      <p>
        <button
          onClick={() => addItem({ item: { id: 'prod_HXvXImwjgMSKcA' } })}
        >
          Add Item to Cart
        </button>
        <button
          onClick={() => addItem({ item: { id: 'prod_HXogmRgYdKsy1a' } })}
        >
          Add a Different Item to Cart
        </button>
        <button onClick={() => clearCart()}>Clear Cart</button>
      </p>
    </GlobalLayout>
  )
}

export default CartPage
