import {useState} from 'react'

import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import {MdDarkMode, MdOutlineLightMode} from 'react-icons/md'
import {IoIosCloseCircle} from 'react-icons/io'
import {GiHamburgerMenu} from 'react-icons/gi'
import TastyKitchenContext from '../../context/TastyKitchenContext'
import Profile from '../Profile'
import './index.css'

const Navbar = props => {
  const [clicked, setClick] = useState(false)
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <TastyKitchenContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value

        const onThemeChange = () => {
          toggleTheme()
        }
        const navBgColor = isDarkTheme ? 'dark-bg' : null
        const textColor = isDarkTheme ? 'light-text' : null
        return (
          <nav className={`nav-container ${navBgColor}`}>
            <div className="header-container">
              <div className="logo-mb-container">
                <Link to="/" className="logo-click">
                  <img
                    src="https://res.cloudinary.com/dlj7gj1po/image/upload/v1700910093/mvnze2cifhpnob8hb2qd.png"
                    className="logo-image-mb"
                    alt="website logo"
                  />
                  <h1 className="logo-heading">Tasty Kitchens</h1>
                </Link>
              </div>

              <button
                className="dark-light-mode-button"
                type="button"
                onClick={onThemeChange}
              >
                {isDarkTheme ? (
                  <MdOutlineLightMode
                    className={`dark-light-mode ${textColor}`}
                  />
                ) : (
                  <MdDarkMode className="dark-light-mode" />
                )}
              </button>
              <div className="nav-profile">
                <Profile />
              </div>
              <button
                type="button"
                className="nav-click-button"
                onClick={() => setClick(!clicked)}
              >
                {}
                <GiHamburgerMenu className={`hamburger-menu ${textColor}`} />
              </button>
            </div>
            {clicked && (
              <div className="hamburger-click-container">
                <ul className="list-container">
                  <Link to="/" className="nav-item">
                    <li className={`${textColor}`}>Home</li>
                  </Link>
                  <Link to="/cart" className="nav-item cart">
                    <li>Cart</li>
                  </Link>
                  <button
                    type="button"
                    className="logout-button"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </ul>
                <button
                  type="button"
                  className="nav-click-button"
                  onClick={() => setClick(!clicked)}
                >
                  <IoIosCloseCircle className={`close-button ${textColor}`} />
                  {}
                </button>
              </div>
            )}
            <div className="hamburger-click-container-lg">
              <ul className="list-container">
                <Link to="/" className="nav-item">
                  <li className={`${textColor}`}>Home</li>
                </Link>
                <Link to="/cart" className="nav-item cart">
                  <li>Cart</li>
                </Link>
                <button
                  className="dark-light-lg"
                  type="button"
                  onClick={onThemeChange}
                >
                  {}
                  {isDarkTheme ? (
                    <MdOutlineLightMode
                      className={`dark-light-mode ${textColor}`}
                    />
                  ) : (
                    <MdDarkMode className="dark-light-mode" />
                  )}
                </button>
                <Profile />
                <button
                  type="button"
                  className="logout-button"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </ul>
            </div>
          </nav>
        )
      }}
    </TastyKitchenContext.Consumer>
  )
}
export default withRouter(Navbar)
