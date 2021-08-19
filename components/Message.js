import { useReducer, useContext, createContext } from 'react'

const MessageStateContext = createContext()
const MessageDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return state = {
        text: action.text, 
        messageType: action.messageType
      }
    case 'CLEAR_MESSAGE':
      return state = {}
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null)
  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  )
}

export const getMessage = () => useContext(MessageStateContext)
export const useDispatchMessage = () => useContext(MessageDispatchContext)