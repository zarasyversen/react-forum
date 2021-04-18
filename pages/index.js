import Head from 'next/head'
import Link from 'next/link'
import LoginForm from '../components/containers/LoginForm'
import SessionMessage from '../components/elements/SessionMessage'
import PostList from '../components/presentational/PostList'
import { useEffect, useState, useContext } from 'react'
import { AuthContext, useAppContext } from '../state/AuthContext'

export default function Index () {
  const [isBusy, setBusy] = useState(true)
  const [activeUser, setActiveUser] = useState('')
  const [pageTitle, setPageTitle] = useState('')
  const [allPosts, setAllPosts] = useState([])
  const { ...state } = useContext(AuthContext)

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
              //no login
            } else {
              // state.login()
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
          {state.isLoggedIn &&
            <>
              <h1>Hi {activeUser}, Welcome to our site</h1>
              <p><Link href="/logout"><a>Logout</a></Link>.</p>
              <section className="posts">
                <h2>Posts</h2>
                <PostList postList={allPosts} />
              </section>
            </>
          }
          {!state.isLoggedIn &&
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
