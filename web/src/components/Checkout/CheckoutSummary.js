import { useCart } from 'src/components/Cart'
import { currency } from 'src/utils'

const CheckoutSummaryItem = ({ item }) => (
  <div key={item.id} className="checkout-summary-item">
    <div className="checkout-summary-item-qty">{item.qty} x</div>
    <div className="checkout-summary-item-name">{item.name}</div>
    <div className="checkout-summary-item-amount">
      {currency(item.unitAmount)}
    </div>
    <div className="checkout-summary-item-description">{item.description}</div>
  </div>
)

export const CheckoutSummary = () => {
  const { cart } = useCart()
  return (
    <div className="checkout-summary">
      <h3 className="checkout-summary-title">Cart Summary</h3>
      {cart &&
        cart.cartItems.map((item) => (
          <CheckoutSummaryItem key={item.id} item={item} />
        ))}
      <div className="checkout-summary-total">
        Total:
        <div className="checkout-summary-total-currency">
          {currency(cart.cartTotal)}
        </div>
      </div>
    </div>
  )
}
