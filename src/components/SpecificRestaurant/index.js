import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'

import Navbar from '../Navbar'
import FoodItem from '../FoodItem'
import Footer from '../Footer'
import TastyKitchenContext from '../../context/TastyKitchenContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class SpecificRestaurant extends Component {
  state = {
    status: apiStatusConstants.initial,
    specificFood: {},
  }

  componentDidMount() {
    this.getSpecificFood()
  }

  convertItemsData = foodData => {
    const item = {
      name: foodData.name,
      cost: foodData.cost,
      foodType: foodData.food_type,
      imageUrl: foodData.image_url,
      id: foodData.id,
      rating: foodData.rating,
    }

    return item
  }

  getConvertData = object => {
    const converted = {
      rating: object.rating,
      restaurantId: object.id,
      name: object.name,
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      imageUrl: object.image_url,
      reviewsCount: object.reviews_count,
      opensAt: object.opens_at,
      location: object.location,
      itemCount: object.items_count,
      foodItems: object.food_items.map(eachItem =>
        this.convertItemsData(eachItem),
      ),
    }
    return converted
  }

  getSpecificFood = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({status: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    // console.log(data)

    if (response.ok) {
      const fetchedData = this.getConvertData(data)
      this.setState({
        status: apiStatusConstants.success,
        specificFood: fetchedData,
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  renderSpecificFoodDetails = () => {
    const {specificFood} = this.state
    const {foodItems} = specificFood
    // console.log(specificFood)
    return (
      <ul className="specific-restaurant-food-list-container">
        {foodItems.map(eachFoodItem => (
          <FoodItem eachFoodItem={eachFoodItem} key={eachFoodItem.id} />
        ))}
      </ul>
    )
  }

  renderSpecificDetails = () => {
    const {specificFood} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      costForTwo,
      reviewsCount,
    } = specificFood
    return (
      <>
        <div className="specific-restaurant-banner">
          <img
            className="specific-restaurant-image"
            src={imageUrl}
            alt="restaurant"
          />
          <div className="specific-restaurant-detailed-container">
            <h1 className="specific-banner-restaurant-name">{name}</h1>
            <p className="specific-banner-restaurant-cuisine">{cuisine}</p>
            <p className="specific-banner-restaurant-location">{location}</p>
            <div className="specific-banner-additional-info-container">
              <div className="specific-banner-review-rating-container">
                <div className="specific-banner-rating-container">
                  <AiFillStar size="12" color="#FFFFFF" />
                  <p className="specific-banner-rating">{rating}</p>
                </div>
                <p className="specific-banner-review">
                  {reviewsCount}+ Ratings
                </p>
              </div>
              <hr className="specific-separator-line-banner" />
              <div className="specific-banner-cast-container">
                <p className="specific-banner-cost-for-two">₹ {costForTwo}</p>
                <p className="specific-cast-for-two-text">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        {this.renderSpecificFoodDetails()}
      </>
    )
  }

  renderSpecificRestaurantLoading = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderNoProductsView = () => (
    <div className="no-products-container">
      <h1 className="no-products">No Products View</h1>
    </div>
  )

  renderSpecificRestaurantFoodData = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.renderSpecificDetails()
      case apiStatusConstants.inProgress:
        return this.renderSpecificRestaurantLoading()
      default:
        return this.renderNoProductsView()
    }
  }

  render() {
    return (
      <TastyKitchenContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const specificDarkTheme = isDarkTheme ? 'specific-res-theme' : null
          return (
            <div className={`specific-container-res ${specificDarkTheme}`}>
              <div className="specific-res-nav">
                <Navbar />
              </div>
              {this.renderSpecificRestaurantFoodData()}
              <Footer />
            </div>
          )
        }}
      </TastyKitchenContext.Consumer>
    )
  }
}

export default SpecificRestaurant
