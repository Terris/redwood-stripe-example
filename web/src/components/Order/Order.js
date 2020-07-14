import { useParams } from '@redwoodjs/router'

import { useOrder } from 'src/components/Order'
import { currency } from 'src/utils'

import { Loader } from '../UI'

export const Order = () => {
  const { id } = useParams()
  const { data, loading, error } = useOrder({ id })

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div className="order">
      <div className="order-receipt">
        <header className="order-receipt-header">
          <div className="order-receipt-ship-to">
            <h4 style={{ paddingBottom: '0' }}>Ship To:</h4>
            <p>
              {data.order.invoice.customerShipping.name}
              <br />
              {data.order.invoice.customerShipping.address.line1}
              <br />
              {data.order.invoice.customerShipping.address.line2}
              <br />
              {data.order.invoice.customerShipping.address.city},
              {data.order.invoice.customerShipping.address.state}
              {'  '}
              {data.order.invoice.customerShipping.address.postalCode}
            </p>
          </div>
          <div className="order-receipt-number">
            <h3>Order # {data.order.invoice.number}</h3>
          </div>
        </header>
        <div className="order-line-items">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th className="number-cell">Qty.</th>
                <th className="number-cell">Unit Price</th>
                <th className="number-cell">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.order.invoice.lines.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td>{item.product.description}</td>
                    <td className="number-cell">{item.qty} x</td>
                    <td className="number-cell">
                      {currency(item.product.unitAmount)}
                    </td>
                    <td className="number-cell strong">
                      {currency(item.amount)}
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="3">&nbsp;</td>
                <td className="number-cell strong">Total</td>
                <td className="number-cell strong">
                  {currency(data.order.invoice.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
