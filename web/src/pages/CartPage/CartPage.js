import { GlobalLayout } from 'src/layouts'
import { Cart } from 'src/components/Cart'
import { useCart } from 'src/components/Cart'

const CartPage = () => {
  const { clearCart } = useCart()
  return (
    <GlobalLayout>
      <h1>Cart</h1>
      <Cart />
      <p>
        <button onClick={() => clearCart()}>Clear Cart</button>
      </p>
    </GlobalLayout>
  )
}

export default CartPage
