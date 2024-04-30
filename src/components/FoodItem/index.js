/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {FiMinus, FiPlus} from 'react-icons/fi'
import TastyKitchenContext from '../../context/TastyKitchenContext'

import './index.css'

class FoodItem extends Component {
  addItemToCart = () => {}

  render() {
    const {eachFoodItem} = this.props
    const {id, name, cost, imageUrl, rating} = eachFoodItem

    return (
      <TastyKitchenContext.Consumer>
        {value => {
          const {
            isDarkTheme,
            cartItem,
            addItemToCart,
            increaseItem,
            decreaseItem,
          } = value

          const specificItemTheme = isDarkTheme ? 'specific-item-theme' : null
          const specificItemAdd = isDarkTheme ? 'specific-add' : null

          const isItemExist = cartItem.find(each => each.id === eachFoodItem.id)

          const onDecreaseItem = () => {
            decreaseItem(id)
          }

          const onIncreaseItem = () => {
            increaseItem(id)
          }

          const onClickAddButton = () => {
            addItemToCart(eachFoodItem)
          }

          return (
            <li
              className="specific-restaurant-food-list-item"
              testid="foodItem"
            >
              <img
                src={imageUrl}
                alt={name}
                className="specific-food-item-image"
              />
              <div className="specific-food-right-container">
                <h1
                  className={`specific-restaurant-food-item-name ${specificItemTheme}`}
                >
                  {name}
                </h1>
                <p
                  className={`specific-restaurant-food-cost ${specificItemTheme}`}
                >
                  ₹ {cost}
                </p>
                <div className="specific-restaurant-food-ratings">
                  <AiFillStar size="12" color="#ffcc00" />
                  <p
                    className={`specific-restaurant-food-rating ${specificItemTheme}`}
                  >
                    {rating}
                  </p>
                </div>

                {isItemExist ? (
                  <div className="add-item-container">
                    <button
                      testid="decrement-count"
                      onClick={onDecreaseItem}
                      className={`items-button ${specificItemTheme}`}
                      type="button"
                    >
                      {}
                      <FiMinus size="10" className={`${specificItemTheme}`} />
                    </button>
                    <p
                      className={`item-quantity ${specificItemTheme}`}
                      testid="active-count"
                    >
                      {isItemExist.quantity}
                    </p>
                    <button
                      testid="increment-count"
                      onClick={onIncreaseItem}
                      className={`items-button ${specificItemTheme}`}
                      type="button"
                    >
                      {}
                      <FiPlus size="10" />
                    </button>
                  </div>
                ) : (
                  <button
                    className={`add-food ${specificItemAdd}`}
                    type="button"
                    onClick={onClickAddButton}
                  >
                    ADD
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </TastyKitchenContext.Consumer>
    )
  }
}
export default FoodItem
