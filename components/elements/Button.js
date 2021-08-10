import PropTypes from 'prop-types'

function Button ({ type, text, onClick, cssClass }) {
  return (
    <button type={type} onClick={onClick} className={`btn btn--primary ${cssClass ? cssClass : ''}`}>
      {text}
    </button>
  )
}

Button.defaultProps = {
  onClick: null
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  cssClass: PropTypes.string
}

export default Button
