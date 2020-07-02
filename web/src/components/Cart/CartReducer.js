export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload.item
      const cartItem = state.cart.find((i) => i.id === item.id)
      // if item already in cart, qty++, else, add item
      cartItem
        ? cartItem.qty++
        : (state.cart = [{ id: item.id, qty: 1 }, ...state.cart])
      action.storage({ ...state })
      return { ...state }
    }
    case 'UPDATE_ITEM_QTY': {
      const cartItem = state.cart.find((item) => item.id === action.payload.id)
      cartItem.qty = action.payload.qty
      action.storage({ ...state })
      state.depPoll = state.depPoll + 1
      return { ...state }
    }
    case 'DELETE_ITEM': {
      const cart = state.cart.filter((item) => item.id !== action.payload.id)
      action.storage({ ...state, cart })
      return { ...state, cart }
    }
    case 'CLEAR_CART': {
      const cart = []
      action.storage({ ...state, cart })
      return { ...state, cart }
    }
    case 'LOG_ITEM_UNIT_AMOUNT': {
      const cartItem = state.cart.find((item) => item.id === action.payload.id)
      cartItem.unitAmount = action.payload.unitAmount
      action.storage({ ...state })
      state.depPoll = state.depPoll + 1
      return { ...state }
    }
    default:
      return state
  }
}
