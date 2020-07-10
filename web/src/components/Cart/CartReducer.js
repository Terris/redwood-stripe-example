import { initialStateStructure } from 'src/components/Cart/CartContext'
import { siftObject } from 'src/utils'

// localStorage functions
const setStorage = (state) =>
  localStorage.setItem('cart', JSON.stringify(state))
const clearStorage = () => localStorage.removeItem('cart')

// Utils
const totalReducer = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.unitAmount * item.qty, 0)
}

// CART REDUCER
// - manages cart context state and sync of localStorage
export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      let cartItems
      // if payload.item exists, update quantity
      // else, add payload.item
      if (state.cartItems.find((item) => item.id === action.payload.item.id)) {
        cartItems = state.cartItems.map((item) => {
          // return item or update qty
          return item.id !== action.payload.item.id
            ? item
            : { ...item, qty: item.qty + 1 }
        })
      } else {
        // add item
        const newItem = siftObject(action.payload.item, '__typename')
        cartItems = [{ ...newItem, qty: 1 }, ...state.cartItems]
      }
      const newState = {
        ...state,
        cartItems,
        cartTotal: totalReducer(cartItems),
      }
      setStorage(newState)
      return newState
    }

    case 'UPDATE_ITEM_QTY': {
      const cartItems = state.cartItems.map((item) => {
        return item.id !== action.payload.id
          ? item
          : { ...item, qty: action.payload.qty }
      })
      const newState = {
        ...state,
        cartItems,
        cartTotal: totalReducer(cartItems),
      }
      setStorage(newState)
      return newState
    }

    case 'DELETE_ITEM': {
      const cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      )
      const newState = {
        ...state,
        cartItems,
        cartTotal: totalReducer(cartItems),
      }
      setStorage(newState)
      return newState
    }

    case 'CLEAR_CART_ITEMS': {
      const newState = { ...state, cartItems: [], cartTotal: 0 }
      setStorage(newState)
      return newState
    }

    case 'CLEAR_CART': {
      clearStorage()
      return initialStateStructure
    }

    default:
      return state
  }
}
