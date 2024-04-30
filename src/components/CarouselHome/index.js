import {useState, useEffect} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

const CarouselHome = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
  })

  useEffect(() => {
    const getApiResponse = async () => {
      const jwtToken = Cookies.get('jwt_token')
      setApiResponse({status: apiStatusConstants.inProgress, data: null})
      const url = 'https://apis.ccbp.in/restaurants-list/offers'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        const fetchedData = data.offers.map(eachItem => ({
          imageUrl: eachItem.image_url,
          id: eachItem.id,
        }))

        setApiResponse({status: apiStatusConstants.success, data: fetchedData})
      }
    }
    getApiResponse()
  }, [])

  const settings = {
    dots: true,
    dotsClass: 'slick-dots',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 3000,
    speed: 700,
  }
  // console.log(apiResponse)

  const renderCarouselImage = () => {
    const {data} = apiResponse
    return (
      <Slider {...settings}>
        {data.map(eachImage => (
          <li className="carousel-list" key={eachImage.id}>
            <img
              src={eachImage.imageUrl}
              alt="offer"
              key="carousel-image"
              className="carousel-image"
            />
          </li>
        ))}
      </Slider>
    )
  }
  const renderLoading = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader" testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="183" width="50" />
    </div>
  )

  const renderData = () => {
    const {status} = apiResponse
    switch (status) {
      case apiStatusConstants.success:
        return renderCarouselImage()
      default:
        return renderLoading()
    }
  }

  return <div className="slider-container">{renderData()}</div>
}

export default CarouselHome
