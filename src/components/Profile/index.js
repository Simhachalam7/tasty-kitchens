import Popup from 'reactjs-popup'

import {CgProfile} from 'react-icons/cg'

import 'reactjs-popup/dist/index.css'

import TastyKitchenContext from '../../context/TastyKitchenContext'

import './index.css'

const Profile = () => (
  <TastyKitchenContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const profileTheme = isDarkTheme ? 'profile-theme' : null
      const profileIconTheme = isDarkTheme ? 'profile-icon-theme' : null
      return (
        <div className="popup-container">
          <Popup
            trigger={
              <button type="button" className="trigger-button">
                <CgProfile className={`profile-icon ${profileIconTheme}`} />
                {}
              </button>
            }
          >
            {close => (
              <>
                <div className={`profile-container ${profileTheme}`}>
                  <ul className="account-list-container">
                    <li className={`account-list-item ${profileTheme}`}>
                      Your Account
                    </li>
                    <li className={`account-list-item ${profileTheme}`}>
                      Coupons
                    </li>
                    <li className={`account-list-item ${profileTheme}`}>
                      Account Settings
                    </li>
                    <li className={`account-list-item ${profileTheme}`}>
                      My Activity
                    </li>
                    <li className={`account-list-item ${profileTheme}`}>
                      Help Center
                    </li>
                    <li className={`account-list-item ${profileTheme}`}>
                      Feedback
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="close-button-1"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </Popup>
        </div>
      )
    }}
  </TastyKitchenContext.Consumer>
)
export default Profile
