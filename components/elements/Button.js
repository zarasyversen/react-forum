import PropTypes from 'prop-types'

function Button ({ type, text, onClick }) {
  return (
    <button type={type} onClick={onClick} className="btn btn--primary">
      {text}
    </button>
  )
}

Button.defaultProps = {
  onClick: null
}

Button.proptypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default Button
