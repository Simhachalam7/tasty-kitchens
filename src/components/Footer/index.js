import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-container">
      <img
        src="https://res.cloudinary.com/dlj7gj1po/image/upload/v1701054646/bo2tsh2demknhiaoki6g.png"
        alt="website-footer-logo"
        className="footer-image"
      />
      <h1 className="footer-heading">Tasty Kitchen</h1>
    </div>
    <p className="footer-paragraph">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-icons-container">
      <FaPinterestSquare testid="pintrest-social-icon" className="logos" />
      <FaInstagram testid="instagram-social-icon" className="logos" />
      <FaTwitterSquare testid="twitter-social-icon" className="logos" />
      <FaFacebookSquare testid="facebook-social-icon" className="logos" />
    </div>
  </div>
)

export default Footer
