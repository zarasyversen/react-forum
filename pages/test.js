import Authentication from '../components/authentication'
import ProtectedResource from '../components/protectedPage'
import { AuthContext } from '../components/src/context'
import { useState } from 'react'

export default function test () {
  const [loggedIn, setLoggedIn] = useState(false)

  const login = () => {
      setLoggedIn(true)
  }
  const logout = () => {
      setLoggedIn(false)
  }

  return (
      <div>
        <Authentication/>
        <ProtectedResource />
      </div>

  )
}
