import PropTypes from 'prop-types'
import Link from 'next/link'

function NavBar ({ userName }) {
  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__item menu__item--indicator">
          <span>{`>>`}</span>
        </li>
        <li className="menu__item">
          <Link href={`profile/${userName}`} className="menu__title"><a>My Profile</a></Link>
        </li>
        <li className="menu__item">
          <Link href="/" className="menu__title"><a>All Posts</a></Link>
        </li>
        <li className="menu__item">
          <Link href="/reset/password" className="menu__title"><a>Reset Password</a></Link>
        </li> 
        <li className="menu__item">
          <Link href="/logout" className="menu__title"><a>Log Out</a></Link>
        </li>
      </ul>
    </nav>
  )
}

NavBar.propTypes = {
  userName: PropTypes.string.isRequired
}

export default NavBar
