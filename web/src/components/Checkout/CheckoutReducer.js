import { initialState, PHASE } from 'src/components/Checkout/CheckoutContext'
import { siftObject } from 'src/utils'

// CHECKOUT REDUCER
export const CheckoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return { ...state, loading: action.payload }
    }
    case 'SET_CUSTOMER': {
      const customer = siftObject(action.payload, '__typename')
      return {
        ...state,
        customer,
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

    case 'FINALIZE_WITH_PAYMENT': {
      const newState = {
        ...state,
        paymentMethod: { ...action.payload.paymentMethod },
        phase: PHASE.CONFIRM_ORDER,
        loading: false,
      }
      return newState
    }

    case 'SET_PHASE': {
      return { ...state, phase: action.payload, loading: false }
    }

    case 'RESET_CHECKOUT': {
      return initialState
    }

    default:
      return state
  }
}
