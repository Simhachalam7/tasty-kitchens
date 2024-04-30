/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {FiMinus, FiPlus} from 'react-icons/fi'

import TastyKitchenContext from '../../context/TastyKitchenContext'

import './index.css'

class CartItem extends Component {
  render() {
    const {itemDetails} = this.props
    console.log(itemDetails)
    const {id, imageUrl, name, cost, quantity} = itemDetails
    const itemPrice = quantity * cost
    return (
      <TastyKitchenContext.Consumer>
        {value => {
          const {isDarkTheme, increaseItem, decreaseItem} = value
          const onIncreaseQuantity = () => {
            increaseItem(id)
          }
          const onDecreaseQuantity = () => {
            decreaseItem(id)
          }

          const cartThemeItems = isDarkTheme ? 'item-cart-light-item' : null
          console.log(cartThemeItems)
          return (
            <li className="cart-item" testid="cartItem">
              <div className="item-dish-container">
                <img src={imageUrl} alt={name} className="cart-item-img" />
                <h1 className={`item-name-large ${cartThemeItems}`}>{name}</h1>
              </div>
              <div className="cart-quantity-container-large">
                <button
                  testid="decrement-quantity"
                  onClick={onDecreaseQuantity}
                  className={`cart-item-btn ${cartThemeItems}`}
                  type="button"
                >
                  {}
                  <FiMinus size="10" className={`${cartThemeItems}`} />
                </button>
                <p
                  className={`cart-item-quantity ${cartThemeItems}`}
                  testid="item-quantity"
                >
                  {quantity}
                </p>
                <button
                  testid="increment-quantity"
                  onClick={onIncreaseQuantity}
                  className={`cart-item-btn ${cartThemeItems}`}
                  type="button"
                >
                  {}
                  <FiPlus size="10" className={`${cartThemeItems}`} />
                </button>
              </div>
              <p className="item-price-large" testid="total-price">
                ₹ {itemPrice}.00
              </p>
              <div className="cart-item-detail">
                <h1 className={`cart-item-name ${cartThemeItems}`}>{name}</h1>
                <div className="cart-item-change-container">
                  <button
                    testid="decrement-quantity"
                    onClick={onDecreaseQuantity}
                    className={`cart-item-btn ${cartThemeItems}`}
                    type="button"
                  >
                    {}
                    <FiMinus size="10" className={`${cartThemeItems}`} />
                  </button>
                  <p className={`cart-item-quantity ${cartThemeItems}`}>
                    {quantity}
                  </p>
                  <button
                    testid="increment-quantity"
                    onClick={onIncreaseQuantity}
                    className={`cart-item-btn ${cartThemeItems}`}
                    type="button"
                  >
                    {}
                    <FiPlus size="10" className={`${cartThemeItems}`} />
                  </button>
                </div>
                <p className="cart-item-total-price" testid="total-price">
                  ₹ {itemPrice}.00
                </p>
              </div>
            </li>
          )
        }}
      </TastyKitchenContext.Consumer>
    )
  }
}

export default CartItem
