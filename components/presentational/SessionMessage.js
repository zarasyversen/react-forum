import { getMessage, useDispatchMessage } from '../Message'
import { useEffect } from 'react'

const SessionMessage = () => {
  const message = getMessage()
  const dispatch = useDispatchMessage()

  useEffect(() => {
    if (message && Object.keys(message).length !== 0) {
      setTimeout(function () {
        dispatch({
          type: 'CLEAR_MESSAGE',
        })
      }, 3000)
    }
  }, [message])

  return (
    <>
      {message && Object.keys(message).length !== 0 && (
        <div className={`session-message ${message.messageType}`}>
          {message.messageType === 'success' && (
            <svg
              className="icon icon-checkbox session-message__icon"
              width="30px"
              height="30px"
              viewBox="0 0 159 159"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                transform="translate(1 1)"
                stroke="black"
                strokeWidth="15"
                fill="none"
                fillRule="evenodd"
              >
                <path d="M39 91l23 24 56-73" />
              </g>
            </svg>
          )}
          {message.messageType === 'error' && (
            <svg
              className="icon icon-cross session-message__icon"
              width="30px"
              height="30px"
              viewBox="0 0 68 83"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="#000" strokeWidth="15" fill="none" fillRule="evenodd">
                <path d="M6 78L62 5M62 78L6 5" />
              </g>
            </svg>
          )}
          {message.text}
        </div>
      )}
    </>
  )
}

export default SessionMessage
