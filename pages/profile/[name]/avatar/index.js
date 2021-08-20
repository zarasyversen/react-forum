import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Button from '../../../../components/elements/Button'
import Link from 'next/link'
import { useDispatchMessage } from '../../../../components/Message'

const Profile = () => {
  const router = useRouter()
  const { name } = router.query
  const [isBusy, setBusy] = useState(true)
  const [userAvatar, setUserAvatar] = useState('')
  const [user, setUser] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [pageTitle, setPageTitle] = useState('Upload Avatar')
  const profileUrl = '/profile/' + name + '/'
  const dispatch = useDispatchMessage()

  useEffect(() => {
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

        if (result.user.avatar) {
          setPageTitle('Edit Your Avatar')
        } 
        // remove user from page if they dont have edit access
        if (!result.canEdit) {
          dispatch({
            type: 'SET_MESSAGE',
            text: 'Sorry, you are not allowed to access this page.',
            messageType: 'error'
          })
          router.push(profileUrl)
        } else {
          setBusy(false)
        }
      })
      .catch(function () {
        // user does not exist
        dispatch({
          type: 'SET_MESSAGE',
          text: 'Sorry, you are not allowed to access this page.',
          messageType: 'error'
        })
        router.push('/')
      })
  }, [])


  function deleteAvatar() {
    const headers = {}
    const token = localStorage.getItem('userToken')
    if (token) {
      headers.Authorization = `${token}`
    }
    fetch('https://php-project.test/api/profile/' + name + '/avatar/delete', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: 'SET_MESSAGE',
          text: result.session_success,
          messageType: 'success'
        })
        router.push(profileUrl)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const headers = {}
    const token = localStorage.getItem('userToken')
    if (token) {
      headers.Authorization = `${token}`
    }

    const formData = new FormData()
    formData.append('file', userAvatar)

    fetch('https://php-project.test/api/profile/' + name + '/avatar/create', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.session_error) {
          setErrorMessage(result.session_error)
        } else {
          setErrorMessage('')
          dispatch({
            type: 'SET_MESSAGE',
            text: result.session_success,
            messageType: 'success'
          })
          router.push(profileUrl)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function onFileChange(event) {
    setUserAvatar(event.target.files[0])
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {isBusy ? (
        <p>Loading...</p>
      ) : (
        <div className="wrapper page-2column">
          <header className="page-header">
            <h1>{pageTitle}</h1>
          </header>
          <aside className="page-sidebar">
            <h2>Current Avatar</h2>
            {user.avatar ? (
              <img src={`https://php-project.test/${user.avatar}`} />
            ) : (
              <p>You don&apos;t have one!</p>
            )}
          </aside>
          <main className="page-main">
            <h2>Update Your Avatar</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="form__group">
                <label htmlFor="avatar">Upload New Avatar:</label>
                <input
                  type="file"
                  name="file"
                  id="avatar"
                  className="form__input file"
                  onChange={onFileChange}
                />
                {errorMessage && <p className="form__error">{errorMessage}</p>}
              </div>
              <Button type="submit" text="Upload Avatar" />
            </form>
            <Button
              type="button"
              text="Delete Avatar"
              cssClass="delete"
              onClick={deleteAvatar}
            />
            <Link href={profileUrl}>
              <a>Return to profile</a>
            </Link>
          </main>
        </div>
      )}
    </>
  )
}

export default Profile
