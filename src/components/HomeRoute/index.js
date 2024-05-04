import './index.css'

import Navbar from '../Navbar'
import CarouselHome from '../CarouselHome'
import PopularRestaurants from '../PopularRestaurants'
import TastyKitchenContext from '../../context/TastyKitchenContext'
import Footer from '../Footer'

// HomeRoute

const HomeRoute = () => (
  <>
    <TastyKitchenContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const homeBgTheme = isDarkTheme ? 'home-bg-dark' : null
        return (
          <div className={`home-container ${homeBgTheme}`}>
            <Navbar />
            <CarouselHome />
            <PopularRestaurants />
          </div>
        )
      }}
    </TastyKitchenContext.Consumer>
    <Footer />
  </>
)
export default HomeRoute
