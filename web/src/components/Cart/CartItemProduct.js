import { useEffect } from 'react'

import { currency } from 'src/utils'

import { useCart } from './CartContext'

export const CartItemProduct = ({ product }) => {
  const { logItemUnitAmount } = useCart()

  useEffect(() => {
    logItemUnitAmount({ id: product.id, unitAmount: product.unitAmount })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  return (
    <div className="cart-item-product">
      <div className="cart-item-product-name">{product.name}</div>
      <div className="cart-item-product-description">{product.description}</div>
      <div className="cart-item-product-price">
        {currency(product.unitAmount)}
      </div>
    </div>
  )
}
