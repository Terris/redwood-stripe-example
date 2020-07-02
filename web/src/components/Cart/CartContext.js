import { createContext, useReducer, useContext } from 'react'

import { CartReducer } from './CartReducer'

// localStorage functions
const setStorage = (state) =>
  localStorage.setItem('cart', JSON.stringify(state))
const getStorage = () => JSON.parse(localStorage.getItem('cart'))

const initialState = getStorage() || { cart: [], depPoll: 0 }

export const CartContext = createContext(initialState)

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState)

  // CART ACTIONS
  // add item
  const addItem = ({ item }) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { item },
      storage: setStorage,
    })
  }
  // update item quantity
  const updateItemQty = ({ id, qty }) => {
    dispatch({
      type: 'UPDATE_ITEM_QTY',
      payload: { id, qty },
      storage: setStorage,
    })
  }
  // delete item
  const deleteItem = ({ id }) => {
    dispatch({
      type: 'DELETE_ITEM',
      payload: { id },
      storage: setStorage,
    })
  }
  // clear cart
  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
      storage: setStorage,
    })
  }
  // log unit amount
  const logItemUnitAmount = ({ id, unitAmount }) => {
    dispatch({
      type: 'LOG_ITEM_UNIT_AMOUNT',
      payload: { id, unitAmount },
      storage: setStorage,
    })
  }

  // set payment intent id
  const setPaymentIntent = ({ id }) => {
    dispatch({
      type: 'SET_PAYMENT_INTENT',
      payload: { id },
      storage: setStorage,
    })
  }

  // Provider Component
  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        depPoll: state.depPoll,
        addItem,
        updateItemQty,
        deleteItem,
        clearCart,
        logItemUnitAmount,
        setPaymentIntent,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
