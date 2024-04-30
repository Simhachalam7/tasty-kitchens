import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsCheckCircleFill} from 'react-icons/bs'

import Navbar from '../Navbar'
import Footer from '../Footer'
import CartItem from '../CartItem'

import TastyKitchenContext from '../../context/TastyKitchenContext'

import './index.css'

class Cart extends Component {
  state = {isPaymentSuccess: false}

  renderPaymentSuccessView = cartDarkPaymentTheme => (
    <div className="payment-success-container">
      <BsCheckCircleFill className="payment-success-icon" />
      <h1 className={`payment-done-heading ${cartDarkPaymentTheme}`}>
        Payment Successful
      </h1>
      <p className={`payment-done-describe ${cartDarkPaymentTheme}`}>
        Thank you for ordering
        <br />
        Your payment is successfully completed.
      </p>
      <Link
        className="cart-link"
        onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
        to="/"
      >
        <button className="go-home-btn" type="button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderOrderedItem = (cartItem, clearCart, isDarkTheme) => {
    let totalAmount = 0
    cartItem.forEach(eachItem => {
      totalAmount += eachItem.cost * eachItem.quantity
    })
    const onOrderPlace = () => {
      this.setState({isPaymentSuccess: true}, clearCart())
    }
    const cartItemThemeItem = isDarkTheme ? 'cart-item-theme' : null
    return (
      <>
        <div className="cart-container">
          <ul className="cart-item-list">
            {cartItem.map(eachItem => (
              <CartItem key={eachItem.id} itemDetails={eachItem} />
            ))}
          </ul>
          <hr className="cart-dash-line" />
          <div className="total-container">
            <h1 className={`order-total-head ${cartItemThemeItem}`}>
              Order Total :
            </h1>
            <p className={`order-total-amount ${cartItemThemeItem}`}>
              ₹ {totalAmount}.00
            </p>
          </div>
          <div className="place-order-btn-container">
            <button
              onClick={onOrderPlace}
              className="place-order-btn"
              type="button"
            >
              Place Order
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  renderNoOrder = isDarkTheme => {
    const noOrderTheme = isDarkTheme ? 'no-order-theme' : null
    return (
      <div className="no-order-container">
        <img
          className="no-order-img"
          src="https://res.cloudinary.com/dlrmevp74/image/upload/v1692818222/cooking_1_zyfkrr.png"
          alt="empty cart"
        />
        <h1 className={`no-order-heading ${noOrderTheme}`}>No Order Yet!</h1>
        <p className={`no-order-describe ${noOrderTheme}`}>
          Your cart is empty. Add something from the menu.
        </p>
        <Link
          className="cart-link"
          onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
          to="/"
        >
          <button className="order-now-btn" type="button">
            Order Now
          </button>
        </Link>
      </div>
    )
  }

  renderOrderView = (cartItem, clearCart, isDarkTheme) =>
    cartItem.length > 0
      ? this.renderOrderedItem(cartItem, clearCart, isDarkTheme)
      : this.renderNoOrder(isDarkTheme)

  render() {
    const {isPaymentSuccess} = this.state
    return (
      <TastyKitchenContext.Consumer>
        {value => {
          const {isDarkTheme, cartItem, clearCart} = value
          const cartDarkTheme = isDarkTheme ? 'cart-dark-theme' : null
          const cartDarkPaymentTheme = isDarkTheme ? 'payment-theme' : null
          return (
            <div className={`cart-route ${cartDarkTheme}`}>
              <div className="cart-navbar">
                <Navbar />
              </div>
              {isPaymentSuccess
                ? this.renderPaymentSuccessView(cartDarkPaymentTheme)
                : this.renderOrderView(cartItem, clearCart, isDarkTheme)}
            </div>
          )
        }}
      </TastyKitchenContext.Consumer>
    )
  }
}

export default Cart
