export const CartItemProduct = ({ product }) => {
  return (
    <div className="cart-item-product">
      <div className="cart-item-product-name">{product.name}</div>
      <div className="cart-item-product-description">{product.description}</div>
      <div className="cart-item-product-price">{product.unitAmount}</div>
    </div>
  )
}
