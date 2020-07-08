import { createContext, useContext, useReducer } from 'react'
import { useAuth } from '@redwoodjs/auth'

import { CheckoutReducer, CheckoutAPI } from 'src/components/Checkout'

// The Checkout Phases
export const PHASE = {
  SET_CUSTOMER: 'SET_CUSTOMER',
  SET_SHIPPING: 'SET_SHIPPING',
  SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
}

// Initial State
export const initialState = {
  phase: PHASE.SET_CUSTOMER,
  customer: null,
  shipping: null,
  intent: null,
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
  const { customer } = CheckoutAPI()

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

  // set auth customer
  const setCustomer = async ({ customerSource }) => {
    setLoading(true)
    const res = await customer.set({ variables: { input: { customerSource } } })
    dispatch({
      type: 'SET_CUSTOMER',
      payload: res.data.setCheckoutCustomer.customer,
    })
  }

  return (
    <CheckoutContext.Provider
      value={{
        checkout: state,
        initCheckout,
        setCustomer,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
