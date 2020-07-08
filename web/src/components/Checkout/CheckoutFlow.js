import { useEffect } from 'react'
import { routes, Link } from '@redwoodjs/router'

import {
  useCheckout,
  PHASE,
  SetCustomer,
  SetPaymentMethod,
} from 'src/components/Checkout'

import { Loader } from '../UI'

export const CheckoutFlow = () => {
  const { checkout, initCheckout } = useCheckout()

  useEffect(() => {
    initCheckout()
  }, [])

  if (checkout.loading) {
    return <Loader type="BLOCK" />
  }

  if (checkout.phase === PHASE.SET_CUSTOMER) {
    return <SetCustomer />
  }

  if (checkout.phase === PHASE.SET_PAYMENT_METHOD) {
    return <SetPaymentMethod />
  }

  return <Default />
}

const Default = () => (
  <p>
    Something went wrong. Please <Link to={routes.cart()}>try again</Link>.
  </p>
)
