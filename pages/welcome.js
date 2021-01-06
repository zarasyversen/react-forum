import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Welcome () {
  const [isBusy, setBusy] = useState(true)
  const [activeUser, setActiveUser] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function getData () {
      const token = localStorage.getItem('userToken')
      const headers = { 'Content-Type': 'application/json' }
      if (token) {
        headers.Authorization = `${token}`
      }

      fetch('http://php-project.test/api/welcome', {
        method: 'POST',
        headers,
        credentials: 'same-origin'
      })
        .then(response => response.json())
        .then(
          (result) => {
            if (result.error) {
              console.log(result.error)
            } else {
              setBusy(false)
              console.log(result)
              setActiveUser(result.activeUser.name)
            }
          }
        )
    }

    if (localStorage.getItem('userToken')) {
      getData()
    } else {
      router.push('/')
    }
  }, [])

  return (
    <div className="wrapper">
      <Head>
        <title>Welcome</title>
      </Head>
      {isBusy ? (
       <p>Loading...</p>
      ) : (
        <>
        <h1>Hi {activeUser}, Welcome to our site</h1>
        <p><Link href="/logout"><a>Logout</a></Link>.</p>
        </>
      )}
    </div>
  )
}
