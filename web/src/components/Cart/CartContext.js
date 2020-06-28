import { createContext, useReducer, useContext } from 'react'

import { CartReducer } from './CartReducer'

// localStorage functions
const setStorage = (state) =>
  localStorage.setItem('cart', JSON.stringify(state))
const getStorage = () => JSON.parse(localStorage.getItem('cart'))
const clearStorage = () => localStorage.removeItem('cart')

const initialState = getStorage() || { cart: [] }

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
    })
    setStorage(state)
  }
  // update item quantity
  const updateItemQty = ({ item, qty }) => {
    dispatch({
      type: 'UPDATE_ITEM_QTY',
      payload: { item, qty },
    })
    setStorage(state)
  }
  // delete item
  const deleteItem = ({ id }) => {
    dispatch({
      type: 'DELETE_ITEM',
      payload: id,
    })
    setStorage(state)
  }
  // clear cart
  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    })
    clearStorage()
  }

  // Provider Component
  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addItem,
        updateItemQty,
        deleteItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
