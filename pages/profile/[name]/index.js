import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import PostList from '../../../components/presentational/PostList'
import NavBar from '../../../components/presentational/NavBar'

const Profile = () => {
  const router = useRouter()
  const { name } = router.query
  const [user, setUser] = useState({})
  const [activeUser, setActiveUser] = useState('')
  const [canEdit, setCanEdit] = useState(false)
  const [userPosts, setUserPosts] = useState([])

  if (name && !user.name) {
    const token = localStorage.getItem('userToken')
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `${token}`
    }

    fetch('https://php-project.test/api/profile/' + name, {
      method: 'POST',
      headers,
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((result) => {
        setUser(result.user)
        setUserPosts(result.postList)
        setCanEdit(result.canEdit)
        getActiveUser()
      })
      .catch(function () {
        // you get here if user does not exist
        // add message - redirect back
        router.push('/')
      })
  }

  function getActiveUser () {
    const token = localStorage.getItem('userToken')
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `${token}`
    }

    fetch('https://php-project.test/api/activeuser', {
      method: 'POST',
      headers,
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(
        (result) => {
          setActiveUser(result.activeUser)
        }
      )
  }

  return (
    <>
      <Head>
        <title>{user.name}</title>
      </Head>
      <NavBar userName={activeUser.name} />
      <div className="wrapper page-2column">
        <header className="page-header">
          <h1>{user.name}</h1>
        </header>
        <aside className="page-sidebar">
          {user.avatar && (
            <img src={`https://php-project.test/${user.avatar}`} />
          )}
          {canEdit && (
            <Link href={`/profile/${user.name}/avatar/`}>
              <a>{user.avatar ? 'Edit Avatar' : 'Add Avatar'}</a>
            </Link>
          )}
          <p>Profile created: {user.createdAt}</p>
          {user.isAdmin && <p>This user is an admin.</p>}
        </aside>
        <main className="page-main">
          <section className="profile__posts">
            <h2>Posts by {user.name}</h2>
            <PostList postList={userPosts} canEdit={canEdit}></PostList>
          </section>
          <Link href="/">
            <a>Return to all posts</a>
          </Link>
        </main>
      </div>
    </>
  )
}

export default Profile
