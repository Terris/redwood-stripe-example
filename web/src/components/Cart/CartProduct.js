import { useEffect } from 'react'

import { currency } from 'src/utils'

import { useCart } from './CartContext'

export const CartProduct = ({ product }) => {
  const { logItemUnitAmount } = useCart()

  useEffect(() => {
    logItemUnitAmount({ id: product.id, unitAmount: product.unitAmount })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  return (
    <div className="cart-product">
      <div className="cart-product-name">{product.name}</div>
      <div className="cart-product-description">{product.description}</div>
      <div className="cart-product-price">{currency(product.unitAmount)}</div>
    </div>
  )
}
