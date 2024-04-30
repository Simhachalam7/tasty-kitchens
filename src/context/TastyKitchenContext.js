import React from 'react'

const TastyKitchenContext = React.createContext({
  cartItem: [],
  isDarkTheme: false,
  toggleTheme: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  increaseItem: () => {},
  decreaseItem: () => {},
  clearCart: () => {},
})

export default TastyKitchenContext
