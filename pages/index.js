import Head from 'next/head'
import Link from 'next/link'
import LoginForm from '../components/containers/LoginForm'
import SessionMessage from '../components/elements/SessionMessage'
import PostList from '../components/presentational/PostList'
import NavBar from '../components/presentational/NavBar'
import { useEffect, useState } from 'react'

export default function Index () {
  const [isBusy, setBusy] = useState(true)
  const [activeUser, setActiveUser] = useState('')
  const [activeUserId, setActiveUserId] = useState('')
  const [pageTitle, setPageTitle] = useState('')
  const [allPosts, setAllPosts] = useState([])

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
            setBusy(false)
            if (result.error) {
              setPageTitle('Welcome, please log in')
            } else {
              setActiveUser(result.activeUser.name)
              setAllPosts(result.postList)
              setPageTitle('Welcome')
            }
          }
        )
    }
    getData()
  }, [])

  return (
    <div className="wrapper">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main>
      {isBusy ? (
       <p>Loading...</p>
      ) : (
        <>
          <SessionMessage type="success" text="Hello there" />
          {activeUser &&
            <>
              <NavBar userName={activeUser} />
              <h1>Hi {activeUser}, Welcome to our site</h1>
              <section className="posts">
                <h2>Posts</h2>
                <PostList postList={allPosts} />
              </section>
            </>
          }
          {!activeUser &&
          <>
            <h1>Welcome to our site.</h1>
            <LoginForm />
            <p>Don't have an account? <Link href="/register"><a>Sign up now</a></Link>.</p>
          </>
          }
        </>
      )}
      </main>
    </div>
  )
}
