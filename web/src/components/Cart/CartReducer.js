export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload.item
      const cartItem = state.cart.find((i) => i.id === item.id)
      // if item already in cart, qty++, else, add item
      cartItem
        ? cartItem.qty++
        : (state.cart = [{ id: item.id, qty: 1 }, ...state.cart])
      return { ...state }
    }
    case 'DELETE_ITEM': {
      const cart = state.cart.filter((item) => item.id !== action.payload.id)
      return { ...state, cart }
    }
    case 'CLEAR_CART': {
      return { ...state, cart: [] }
    }
    default:
      return state
  }
}
