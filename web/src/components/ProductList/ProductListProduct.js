import { useState, useEffect } from 'react'

import { useCart } from 'src/components/Cart'
import { currency } from 'src/utils'

export const ProductListProduct = ({ product }) => {
  const { addItem } = useCart()
  const [carting, setCarting] = useState(false)

  let cartingTimer

  const onClick = () => {
    setCarting(true)
    cartingTimer = setTimeout(() => setCarting(false), 1000)
    addItem({ item: { ...product } })
  }

  useEffect(() => {
    return () => clearTimeout(cartingTimer)
  }, [cartingTimer])

  return (
    <div className="product-list-product">
      <h2>{product.name}</h2>
      {product.images && (
        <figure className="product-list-product-img">
          <img src={product.images[0]} />
        </figure>
      )}
      <div className="product-list-product-footer">
        <p>{product.description}</p>
        <p>{currency(product.unitAmount)}</p>
      </div>
      <hr />
      <p style={{ textAlign: 'right' }}>
        <button
          onClick={() => onClick()}
          className={`${carting ? 'btn-feedback' : ''}`}
          disabled={carting}
        >
          Add to cart
        </button>
      </p>
    </div>
  )
}
