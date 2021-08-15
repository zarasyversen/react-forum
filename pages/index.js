import Head from 'next/head'
import Link from 'next/link'
import LoginForm from '../components/containers/LoginForm'
import NewPost from '../components/containers/NewPost'
import SessionMessage from '../components/elements/SessionMessage'
import PostList from '../components/presentational/PostList'
import NavBar from '../components/presentational/NavBar'
import { useEffect, useState } from 'react'

export default function Index () {
  const [isBusy, setBusy] = useState(true)
  const [activeUser, setActiveUser] = useState('')
  const [pageTitle, setPageTitle] = useState('')
  const [allPosts, setAllPosts] = useState([])

  function getData () {
    const token = localStorage.getItem('userToken')
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `${token}`
    }

    fetch('https://php-project.test/api/welcome', {
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
            setActiveUser(result.activeUser)
            setAllPosts(result.postList)
            setPageTitle('Welcome')
          }
        }
      )
  }

  useEffect(() => {
    getData()
  }, [])

  function updatePosts() {
    getData();
  }

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
          {/* <SessionMessage type="success" text="Hello there" /> */}
          {activeUser &&
            <>
              <NavBar userName={activeUser.name} />
              <h1>Hi {activeUser.name}, Welcome to our site</h1>
              <NewPost updatePostsMethod={updatePosts}/>
              <section className="posts">
                <h2>Posts</h2>
                <PostList postList={allPosts} canEdit={activeUser}/>
              </section>
            </>
          }
          {!activeUser &&
          <>
            <h1>Welcome to our site.</h1>
            <LoginForm />
            <p>Don&apos;t have an account? <Link href="/register"><a>Sign up now</a></Link>.</p>
          </>
          }
        </>
      )}
      </main>
    </div>
  )
}
