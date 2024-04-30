/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import TastyKitchenContext from '../../context/TastyKitchenContext'
import './index.css'

const Restaurant = props => {
  const {eachRestaurant} = props
  const {id, imageUrl, name, cuisine, userRating} = eachRestaurant
  const {rating} = userRating
  return (
    <TastyKitchenContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const restaurantTheme = isDarkTheme ? 'res-dark-theme' : null
        return (
          <Link to={`/restaurant/${id}`} className="restaurant-specific">
            <li testid="restaurant-item" className="restaurant-list-item">
              <img
                src={imageUrl}
                className="restaurant-image"
                alt="restaurant"
              />
              <div className="restaurant-name-left-container">
                <h1
                  className={`restaurant-list-item-rating ${restaurantTheme}`}
                >
                  {name}
                </h1>
                <p className={`cuisine ${restaurantTheme}`}>{cuisine}</p>
                <div className="restaurants-name-ratings-container">
                  <img
                    src="https://res.cloudinary.com/dlj7gj1po/image/upload/v1701004925/doazeweizegg5ncquywm.png"
                    alt="star"
                    className="star"
                  />
                  <p className={`restaurant-name-rating ${restaurantTheme}`}>
                    {rating}{' '}
                    <span className={`ratings-no ${restaurantTheme}`}>
                      (222 ratings)
                    </span>
                  </p>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </TastyKitchenContext.Consumer>
  )
}

export default Restaurant
