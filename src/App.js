import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import HomeRoute from './components/HomeRoute'
import Cart from './components/Cart'
import SpecificRestaurant from './components/SpecificRestaurant'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import TastyKitchenContext from './context/TastyKitchenContext'

import './App.css'

const getCartItemDetail = () => {
  const localCartItem = JSON.parse(localStorage.getItem('cartData'))
  if (localCartItem === null) {
    return []
  }
  return localCartItem
}

class App extends Component {
  state = {
    cartItem: getCartItemDetail(),
    isDarkTheme: false,
  }

  getCartItemDetail = () => {
    const localCartItem = JSON.parse(localStorage.getItem('cartData'))
    if (localCartItem === null) {
      return []
    }
    return localCartItem
  }

  setCartToLocal = () => {
    const {cartItem} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartItem))
  }

  addItemToCart = item => {
    const {cartItem} = this.state
    const isItemExist = cartItem.find(eachItem => eachItem.id === item.id)
    if (isItemExist) {
      const updatedCart = cartItem.map(eachItem => {
        if (eachItem.id === isItemExist.id) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      })
      this.setState({cartItem: updatedCart}, this.setCartToLocal)
    } else {
      this.setState(
        prevState => ({
          cartItem: [...prevState.cartItem, {...item, quantity: 1}],
        }),
        this.setCartToLocal,
      )
    }
  }

  removeItemFromCart = id => {
    const {cartItem} = this.state
    const filteredCartItem = cartItem.filter(eachItem => eachItem.id !== id)
    this.setState({cartItem: filteredCartItem}, this.setCartToLocal)
  }

  decreaseItem = eachId => {
    const {cartItem} = this.state
    const itemDetail = cartItem.find(eachItem => eachItem.id === eachId)
    if (itemDetail.quantity > 1) {
      const updatedQuantityCart = cartItem.map(eachItem => {
        if (eachItem.id === eachId) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return eachItem
      })
      this.setState({cartItem: updatedQuantityCart}, this.setCartToLocal)
    } else {
      this.removeItemFromCart(eachId)
    }
  }

  increaseItem = id => {
    const {cartItem} = this.state
    const updatedCart = cartItem.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })
    this.setState({cartItem: updatedCart}, this.setCartToLocal)
  }

  clearCart = () => {
    this.setState({cartItem: []}, this.setCartToLocal)
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  render() {
    const {cartItem, isDarkTheme} = this.state
    //  console.log(isDarkTheme)
    return (
      <TastyKitchenContext.Provider
        value={{
          cartItem,
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          addItemToCart: this.addItemToCart,
          increaseItem: this.increaseItem,
          decreaseItem: this.decreaseItem,
          clearCart: this.clearCart,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={SpecificRestaurant}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </TastyKitchenContext.Provider>
    )
  }
}

export default App
