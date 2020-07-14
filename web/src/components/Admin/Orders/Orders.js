import { Link, routes } from '@redwoodjs/router'

import { currency } from 'src/utils'

const OrdersList = ({ orders }) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>id</th>
            <th>receipt number</th>
            <th>status</th>
            <th>total</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.invoice.number}</td>
                <td>{order.invoice.status}</td>
                <td>{currency(order.invoice.total)}</td>
                <td>
                  <nav className="rw-table-actions">
                    <Link
                      to={routes.order({ id: order.id })}
                      title={'Show order ' + order.id + ' detail'}
                      className="rw-button rw-button-small"
                    >
                      Show
                    </Link>
                  </nav>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersList
