/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {
  BsFilterLeft,
  BsArrowLeftSquare,
  BsArrowRightSquare,
} from 'react-icons/bs'

import Restaurant from '../Restaurant'

import TastyKitchenContext from '../../context/TastyKitchenContext'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularRestaurants extends Component {
  state = {
    activeOptionId: sortByOptions[1].value,
    apiStatus: apiStatusConstants.initial,
    restaurantsList: [],
    activePage: 1,
    searchInput: '',
  }

  componentDidMount() {
    this.getRestaurantsNames()
  }

  convertRestaurantObjects = object => {
    const converted = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      groupByTime: object.group_by_time,
      hasOnlineDelivery: object.has_online_delivery,
      hasTableBooking: object.has_table_booking,
      id: object.id,
      imageUrl: object.image_url,
      isDeliveringNow: object.is_delivering_now,
      location: object.location,
      menuType: object.menu_type,
      name: object.name,
      opensAt: object.opens_at,
      userRating: {
        rating: object.user_rating.rating,
        ratingColor: object.user_rating.rating_color,
        ratingText: object.user_rating.rating_text,
        totalReviews: object.user_rating.total_reviews,
      },
    }
    return converted
  }

  onChangeOption = event => {
    this.setState(
      {activeOptionId: event.target.value},
      this.getRestaurantsNames,
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getRestaurantsNames)
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getRestaurantsNames()
    }
  }

  getRestaurantsNames = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId, activePage, searchInput} = this.state
    const limit = 9
    const offset = activePage
    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const convertRestaurants = data.restaurants.map(each =>
        this.convertRestaurantObjects(each),
      )
      // console.log(convertRestaurants)
      this.setState({
        apiStatus: apiStatusConstants.success,
        restaurantsList: convertRestaurants,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderData = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurant-list-container">
        {restaurantsList.map(eachRestaurant => (
          <Restaurant eachRestaurant={eachRestaurant} key={eachRestaurant.id} />
        ))}
      </ul>
    )
  }

  renderSortByProducts = (isDarkTheme, darkTheme) => {
    const {activeOptionId} = this.state
    const sortBg = isDarkTheme ? 'sort-bg-theme' : null
    // console.log(activeOptionId)
    return (
      <div className={`sort-by-container ${sortBg}`}>
        <BsFilterLeft className={`sort-by-icon ${darkTheme}`} />
        <p className={`sort-by ${darkTheme}`}>Sort by</p>
        <select
          className={`sort-by-select ${sortBg} ${darkTheme}`}
          value={activeOptionId}
          onChange={this.onChangeOption}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className={`select-option ${darkTheme}`}
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  restaurantsDisplayLoading = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="restaurant-Loader" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickLeftPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurantsNames,
      )
    }
  }

  onClickRightPage = () => {
    const {activePage} = this.state
    if (activePage < 20) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurantsNames,
      )
    }
  }

  renderFailureView = darkTheme => (
    <h1 className={`no-restaurant-found-mgg ${darkTheme}`}>
      No restaurant found
    </h1>
  )

  renderPaginationField = darkTheme => {
    const {activePage} = this.state
    return (
      <div className="pagination-container">
        <button
          type="button"
          className="pagination-button"
          testid="pagination-left-button"
          onClick={this.onClickLeftPage}
        >
          {}
          <BsArrowLeftSquare
            alt="pagination left"
            className={`pagination-icon ${darkTheme}`}
          />
        </button>
        <p className={`page-no ${darkTheme}`} testid="active-page-number">
          {activePage} of 20
        </p>
        <button
          type="button"
          className="pagination-button"
          testid="pagination-right-button"
          onClick={this.onClickRightPage}
        >
          {}
          <BsArrowRightSquare
            alt="pagination right"
            className={`pagination-icon ${darkTheme}`}
          />
        </button>
      </div>
    )
  }

  renderRestaurantsData = darkTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderData()
      case apiStatusConstants.inProgress:
        return this.restaurantsDisplayLoading()
      default:
        return this.renderFailureView(darkTheme)
    }
  }

  render() {
    const {searchInput} = this.state
    // console.log(searchInput)
    return (
      <TastyKitchenContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const darkTheme = isDarkTheme ? 'popular-res-dark' : null
          return (
            <div className="popular-restaurants-container">
              <div className="popular-sort-container">
                <div>
                  <h1 className={`popular-restaurants-heading ${darkTheme}`}>
                    Popular Restaurants
                  </h1>
                  <p className={`popular-restaurants-paragraph ${darkTheme}`}>
                    Select Your favourite restaurant special dish and make your
                    day happy...
                  </p>
                </div>
                {this.renderSortByProducts(isDarkTheme, darkTheme)}
              </div>
              <input
                type="search"
                className="search-input"
                placeholder="Search Your Favourite Restaurant"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <hr className="horizontal-line" />
              {this.renderRestaurantsData(darkTheme)}
              {this.renderPaginationField(darkTheme)}
            </div>
          )
        }}
      </TastyKitchenContext.Consumer>
    )
  }
}

export default PopularRestaurants
