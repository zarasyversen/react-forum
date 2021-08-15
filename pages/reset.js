import Head from 'next/head'
import ResetForm from '../components/containers/ResetForm'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NavBar from '../components/presentational/NavBar'

export default function Reset() {
  const router = useRouter()
  const [activeUser, setActiveUser] = useState(null)
  const [isBusy, setBusy] = useState(true)
  useEffect(() => {
    getActiveUser()
  }, [])

  function getActiveUser() {
    const token = localStorage.getItem('userToken')
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `${token}`
    }

    fetch('https://php-project.test/api/activeuser', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.activeUser) {
          setBusy(false)
          setActiveUser(result.activeUser)
        } else {
          // no user logged in!!!!!
          //set message
          router.push('/')
        }
      })
  }

  return (
    <>
      {isBusy ? (
        <p>Loading...</p>
      ) : (
        <>
          <Head>
            <title>Reset Password</title>
          </Head>
          {activeUser && <NavBar userName={activeUser.name} />}
          <div className="wrapper">
            <h1>Reset Password</h1>
            <ResetForm />
          </div>
        </>
      )}
    </>
  )
}
