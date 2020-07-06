import { Loader } from 'src/components/UI'
import { currency } from 'src/utils'

import { useCheckout } from './hooks'

export const Checkout = () => {
  const { checkout, loading, error } = useCheckout()

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p className="text-error">{error.message}</p>
  }

  return (
    <div className="checkout">
      {checkout && <>{console.log(checkout)}</>}
      <div className="checkout-steps">
        <h3>Steps Here</h3>
      </div>
      <div className="checkout-summary">
        <h4 className="checkout-summary-title">Cart Summary</h4>
        {checkout &&
          checkout.invoice.lines.map((item) => (
            <div key={item.id} className="checkout-summary-item">
              <div className="checkout-summary-item-qty">{item.qty} x</div>
              <div className="checkout-summary-item-name">
                {item.product.name}
              </div>
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
    </div>
  )
}
