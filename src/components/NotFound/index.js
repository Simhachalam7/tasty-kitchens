import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="notfoundCon">
    <img
      className="notfoundImg"
      src="https://res.cloudinary.com/dlj7gj1po/image/upload/v1701082959/tfxkoc4xes1vv4dwyzdu.png"
      alt="not found"
    />
    <h1 className="headingEle">Page Not Found</h1>
    <p className="paraEle">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/">
      <button className="buttonEle" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
