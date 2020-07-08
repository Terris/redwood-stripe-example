import { currency } from 'src/utils'

export const CartProduct = ({ product }) => {
  return (
    <div className="cart-product">
      <div className="cart-product-name">{product.name}</div>
      <div className="cart-product-description">{product.description}</div>
      <div className="cart-product-price">{currency(product.unitAmount)}</div>
    </div>
  )
}
