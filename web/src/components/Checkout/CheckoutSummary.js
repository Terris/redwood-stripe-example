import { currency } from 'src/utils'
export const CheckoutSummary = ({ checkout }) => (
  <div className="checkout-summary">
    <h3 className="checkout-summary-title">Cart Summary</h3>
    {checkout &&
      checkout.invoice.lines.map((item) => (
        <div key={item.id} className="checkout-summary-item">
          <div className="checkout-summary-item-qty">{item.qty} x</div>
          <div className="checkout-summary-item-name">{item.product.name}</div>
          <div className="checkout-summary-item-amount">
            {currency(item.amount)}
          </div>
          <div className="checkout-summary-item-description">
            {item.product.description}
          </div>
        </div>
      ))}
    <div className="checkout-summary-total">
      Total:
      <div className="checkout-summary-total-currency">
        {currency(checkout.invoice.amount_due)}
      </div>
    </div>
  </div>
)
