import Head from 'next/head'
import Link from 'next/link'
import LoginForm from '../components/containers/LoginForm'
import NewPost from '../components/containers/NewPost'
import SessionMessage from '../components/presentational/SessionMessage'
import PostList from '../components/presentational/PostList'
import NavBar from '../components/presentational/NavBar'
import { useEffect, useState } from 'react'

export default function Index() {
  const [isBusy, setBusy] = useState(true)
  const [activeUser, setActiveUser] = useState('')
  const [pageTitle, setPageTitle] = useState('')
  const [allPosts, setAllPosts] = useState([])

  function getData() {
    const token = localStorage.getItem('userToken')
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `${token}`
    }

    fetch('https://php-project.test/api/welcome', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((result) => {
        setBusy(false)
        if (result.error) {
          setPageTitle('Welcome, please log in')
        } else {
          setPageTitle('Welcome')
          getActiveUser()
          getPosts()
        }
      })
  }

  function getPosts() {
    const token = localStorage.getItem('userToken')
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `${token}`
    }

    fetch('https://php-project.test/api/allposts', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((result) => {
        setAllPosts(result.postList)
      })
  }

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
        setActiveUser(result.activeUser)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  function updatePosts() {
    getPosts()
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {activeUser && <NavBar userName={activeUser.name} />}
      <div className="wrapper">
        <main>
          {isBusy ? (
            <p>Loading...</p>
          ) : (
            <>
              <SessionMessage />
              {activeUser && (
                <>
                  <h1>Hi {activeUser.name}, Welcome to our site</h1>
                  <NewPost updatePostsMethod={updatePosts} />
                  <section className="posts">
                    <h2>Posts</h2>
                    <PostList postList={allPosts} canEdit={activeUser} />
                  </section>
                </>
              )}
              {!activeUser && (
                <>
                  <h1>Welcome to our site.</h1>
                  <LoginForm />
                  <p>
                    Don&apos;t have an account?{' '}
                    <Link href="/register">
                      <a>Sign up now</a>
                    </Link>
                    .
                  </p>
                </>
              )}
            </>
          )}
        </main>
      </div>
    </>
  )
}
