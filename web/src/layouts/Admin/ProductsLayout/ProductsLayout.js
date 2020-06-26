import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

import { AdminLayout } from 'src/layouts'

const ProductsLayout = (props) => {
  return (
    <AdminLayout>
      <div className="rw-scaffold">
        <Flash timeout={3000} />
        <header className="rw-header">
          <h1 className="rw-heading rw-heading-primary">
            <Link to={routes.adminProducts()} className="rw-link">
              Products
            </Link>
          </h1>
          <Link
            to={routes.adminNewProduct()}
            className="rw-button rw-button-green"
          >
            <div className="rw-button-icon">+</div> New Product
          </Link>
        </header>
        <main className="rw-main">{props.children}</main>
      </div>
    </AdminLayout>
  )
}

export default ProductsLayout
