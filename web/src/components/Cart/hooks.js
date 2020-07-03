import { useEffect, useState } from 'react'

import { useCart } from './CartContext'

export const useCartTotal = () => {
  const { cart } = useCart()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const cartReducer = cart.cartItems.reduce(
      (acc, item) => acc + item.qty * item.unitAmount,
      0
    )
    setTotal(cartReducer)
  }, [cart])
  return total
}
