import PropTypes from 'prop-types'

function SessionMessage ({ type, text }) {
  return (
    <div className={`session-message ${type}`}>
      {type === 'success' &&
       <svg
        className="icon icon-checkbox session-message__icon"
        width="30px"
        height="30px"
        viewBox="0 0 159 159"
        xmlns="http://www.w3.org/2000/svg">
         <g transform="translate(1 1)" stroke="black" strokeWidth="15" fill="none" fillRule="evenodd"><path d="M39 91l23 24 56-73"/></g>
       </svg>
      }
      {type === 'error' &&
        <svg
          className="icon icon-cross session-message__icon"
          width="30px"
          height="30px"
          viewBox="0 0 68 83"
          xmlns="http://www.w3.org/2000/svg">
            <g stroke="#000" strokeWidth="15" fill="none" fillRule="evenodd"><path d="M6 78L62 5M62 78L6 5"/></g>
        </svg>
      }
      {text}
    </div>
  )
}

SessionMessage.proptypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default SessionMessage
