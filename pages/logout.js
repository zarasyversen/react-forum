import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatchMessage } from '../components/Message'

export default function LogOut () {
  const router = useRouter()
  const dispatch = useDispatchMessage()

  useEffect(() => {
    localStorage.removeItem('userToken')
    dispatch({
      type: 'SET_MESSAGE',
      text: 'Successfully logged out!',
      messageType: 'success'
    })
    router.push('/')
  }, [])

  return ''
}
