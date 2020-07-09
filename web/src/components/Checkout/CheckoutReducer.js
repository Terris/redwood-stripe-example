import { initialState, PHASE } from 'src/components/Checkout/CheckoutContext'

// CHECKOUT REDUCER
export const CheckoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return { ...state, loading: action.payload }
    }
    case 'SET_CUSTOMER': {
      return {
        ...state,
        customer: { ...action.payload },
        phase: PHASE.SET_SHIPPING,
        loading: false,
      }
    }
    case 'SET_SHIPPING': {
      return {
        ...state,
        customer: {
          ...state.customer,
          shipping: { ...action.payload },
        },
        phase: PHASE.SET_PAYMENT,
        loading: false,
      }
    }

    case 'SET_PHASE': {
      console.log('REDUCER: ', action.payload)
      return { ...state, phase: action.payload, loading: false }
    }

    case 'RESET_CHECKOUT': {
      return initialState
    }

    default:
      return state
  }
}
