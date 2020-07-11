import { createContext, useContext, useReducer } from 'react'
import { useAuth } from '@redwoodjs/auth'

import { useCart } from 'src/components/Cart'
import { CheckoutReducer, CheckoutAPI } from 'src/components/Checkout'

// The Checkout Phases
export const PHASE = {
  SET_CUSTOMER: 'SET_CUSTOMER',
  SET_SHIPPING: 'SET_SHIPPING',
  // SET_INTENT: 'SET_INTENT', // programmatic phase only
  SET_PAYMENT_METHOD: 'SET_PAYMENT',
  ORDER_CONFIRMATION: 'ORDER_CONFIRMATION',
}

// Initial State
export const initialState = {
  phase: PHASE.SET_CUSTOMER,
  customer: null,
  paymentMethod: null,
  setupIntent: null,
  invoice: null,
  loading: false,
  error: null,
}

// Create the Context
const CheckoutContext = createContext(initialState)

// useCheckout hook
export const useCheckout = () => useContext(CheckoutContext)

// The Provider
export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CheckoutReducer, initialState)
  const { currentUser } = useAuth()
  const { cart, clearCart } = useCart()
  const API = CheckoutAPI()

  // ACTIONS
  // set loading
  const setLoading = (val) => {
    dispatch({
      type: 'SET_LOADING',
      payload: val,
    })
  }

  const initCheckout = () => {
    setLoading(true)
    if (currentUser) {
      setCustomer({ customerSource: 'AUTH' })
    } else {
      setLoading(false)
    }
  }

  const setCustomer = async ({ customerSource }) => {
    setLoading(true)
    const res = await API.setCustomer({
      variables: { input: { customerSource } },
    })
    dispatch({
      type: 'SET_CUSTOMER',
      payload: res.data.setCustomer.customer,
    })
  }

  const setShipping = async ({ input }) => {
    setLoading(true)
    const res = await API.setShipping({
      variables: { customerId: state.customer.id, input },
    })
    dispatch({
      type: 'SET_SHIPPING',
      payload: res.data.setShipping.customer,
    })
  }

  const setIntent = async () => {
    setLoading(true)
    const res = await API.setIntent({
      variables: { customerId: state.customer.id },
    })
    dispatch({
      type: 'SET_INTENT',
      payload: res.data.setIntent.setupIntent,
    })
  }

  const placeOrder = async ({ paymentMethodId }) => {
    setLoading(true)
    const res = await API.placeOrder({
      variables: {
        input: {
          customerId: state.customer.id,
          paymentMethodId,
          cart,
        },
      },
    })
    if (res.data.placeOrder.invoice.status === 'paid') {
      clearCart()
      dispatch({
        type: 'PLACE_ORDER',
        payload: res.data.placeOrder.invoice,
      })
    }
  }

  const setPhase = (phase) => {
    dispatch({
      type: 'SET_PHASE',
      payload: phase,
    })
  }

  return (
    <CheckoutContext.Provider
      value={{
        checkout: state,
        initCheckout,
        setCustomer,
        setShipping,
        setIntent,
        placeOrder,
        setPhase,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
