import { useEffect } from 'react'
import { routes, Link } from '@redwoodjs/router'

import {
  useCheckout,
  PHASE,
  SetCustomer,
  SetPaymentMethod,
} from 'src/components/Checkout'

export const CheckoutFlow = () => {
  const { checkout, initCheckout } = useCheckout()
  useEffect(() => {
    initCheckout()
  }, [])

  switch (checkout.phase) {
    case PHASE.SET_CUSTOMER:
      return <SetCustomer />
    case PHASE.SET_PAYMENT_METHOD:
      return <SetPaymentMethod />
    default:
      return <Default />
  }
}

const Default = () => (
  <p>
    Something went wrong. Please <Link to={routes.cart()}>try again</Link>.
  </p>
)
