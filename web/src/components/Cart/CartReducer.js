import { initialStateStructure } from 'src/components/Cart/CartContext'
// localStorage functions
const setStorage = (state) =>
  localStorage.setItem('cart', JSON.stringify(state))
const clearStorage = () => localStorage.removeItem('cart')

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      let cartItems
      // if payload.item exists, update quantity
      // else, add payload.item
      if (state.cartItems.find((i) => i.id === action.payload.item.id)) {
        cartItems = state.cartItems.map((i) => {
          // return item or update qty
          return i.id !== action.payload.item.id ? i : { ...i, qty: i.qty + 1 }
        })
      } else {
        // add item
        cartItems = [{ ...action.payload.item, qty: 1 }, ...state.cartItems]
      }
      const newState = { ...state, cartItems }
      setStorage(newState)
      return newState
    }

    case 'UPDATE_ITEM_QTY': {
      const cartItems = state.cartItems.map((i) => {
        return i.id !== action.payload.id
          ? i
          : { ...i, qty: action.payload.qty }
      })
      const newState = { ...state, cartItems }
      setStorage(newState)
      return newState
    }

    case 'DELETE_ITEM': {
      const cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      )
      const newState = { ...state, cartItems }
      setStorage(newState)
      return newState
    }

    case 'CLEAR_CART_ITEMS': {
      const newState = { ...state, cartItems: [] }
      setStorage(newState)
      return newState
    }

    case 'CLEAR_CART': {
      clearStorage()
      return initialStateStructure
    }

    case 'LOG_ITEM_UNIT_AMOUNT': {
      const cartItems = state.cartItems.map((i) => {
        return i.id !== action.payload.id
          ? i
          : { ...i, unitAmount: action.payload.unitAmount }
      })
      const newState = { ...state, cartItems }
      setStorage(newState)
      return newState
    }

    case 'SET_INVOICE_ID': {
      const newState = { ...state, invoiceId: action.payload.id }
      setStorage(newState)
      return newState
    }

    default:
      return state
  }
}
