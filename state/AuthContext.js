import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AuthContext ({ children }) {
  const state = {
    isLoggedIn: false,
    token: null,
    login: () => {},
    logout: () => {}
  }
  const [loggedIn, setLoggedIn] = useState(false)
  const login = () => {
    setLoggedIn(true)
  }
  const logout = () => {
    setLoggedIn(false)
  }

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext () {
  return useContext(AppContext)
}
