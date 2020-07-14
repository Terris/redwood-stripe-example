import { Link, routes } from '@redwoodjs/router'

import { AdminLayout } from 'src/layouts'

const OrdersLayout = (props) => {
  return (
    <AdminLayout>
      <div className="rw-scaffold">
        <header className="rw-header">
          <h1 className="rw-heading rw-heading-primary">
            <Link to={routes.adminOrders()} className="rw-link">
              Orders
            </Link>
          </h1>
        </header>
        <main className="rw-main">{props.children}</main>
      </div>
    </AdminLayout>
  )
}

export default OrdersLayout
