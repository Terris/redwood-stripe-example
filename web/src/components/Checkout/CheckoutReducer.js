import { initialState, PHASE } from 'src/components/Checkout/CheckoutContext'

// CHECKOUT REDUCER
export const CheckoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return { ...state, loading: action.payload }
    }
    case 'SET_CUSTOMER': {
      return { ...state }
    }

    default:
      return state
  }
}
