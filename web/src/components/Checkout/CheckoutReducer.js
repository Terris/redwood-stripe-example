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
      const phase = customer.shipping ? PHASE.SET_PAYMENT : PHASE.SET_SHIPPING
      return {
        ...state,
        customer,
        phase,
        loading: false,
      }
    }

    case 'SET_SHIPPING': {
      const customer = siftObject(action.payload, '__typename')
      return {
        ...state,
        customer,
        phase: PHASE.SET_PAYMENT,
        loading: false,
      }
    }

    case 'SET_INTENT': {
      const setupIntent = siftObject(action.payload, '__typename')
      return {
        ...state,
        setupIntent,
        phase: PHASE.SET_PAYMENT,
        loading: false,
      }
    }

    case 'PLACE_ORDER': {
      const invoice = siftObject(action.payload, '__typename')
      return { invoice, phase: PHASE.ORDER_CONFIRMATION, loading: false }
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
