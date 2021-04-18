import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'
import PostList from '../../../components/presentational/PostList'

const Profile = () => {
  const router = useRouter()
  const { name } = router.query
  const [user, setUser] = useState({})
  const [canEdit, setCanEdit] = useState(false)
  const [userPosts, setUserPosts] = useState([])

  if (name && !user.name) {
    const token = localStorage.getItem('userToken')
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `${token}`
    }

    fetch('http://php-project.test/api/profile/' + name, {
      method: 'POST',
      headers,
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(
        (result) => {
          console.log(result)
          setUser(result.user)
          setCanEdit(result.canEdit)
          setUserPosts(result.postList)
        }
      )
  }

  return (
    <>
    <Head>
        <title>{user.name}</title>
    </Head>
    <div className="wrapper page-2column">
      <header className="page-header">
        <h1>{user.name}</h1>
      </header>
      <aside className="page-sidebar">
        {user.avatar && 
         <img src={`http://php-project.test/${user.avatar}`}/>
        }
        <p>Profile created: {user.createdAt}</p>
        {user.isAdmin && 
        <p>This user is an admin.</p>
        }
      </aside>
      <main className="page-main">
        <section className="profile__posts">
          <h2>Posts by {user.name}</h2>
          <PostList postList={userPosts} />
        </section>
        <a href="/welcome">Return to all posts</a>
      </main>
    </div>
    </>
  )
}

export default Profile
