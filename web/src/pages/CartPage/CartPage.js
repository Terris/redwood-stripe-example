import { GlobalLayout } from 'src/layouts'
import { Cart } from 'src/components/Cart'
import { useCart } from 'src/components/Cart'
import { currency, total } from 'src/utils'
const CartPage = () => {
  const { cart, clearCart } = useCart()
  return (
    <GlobalLayout>
      <h1>Cart</h1>
      <Cart />
      <p style={{ textAlign: 'right' }}>
        <button>Checkout</button>{' '}
        <button onClick={() => clearCart()} className="btn-red">
          Clear Cart
        </button>
      </p>
    </GlobalLayout>
  )
}

export default CartPage
