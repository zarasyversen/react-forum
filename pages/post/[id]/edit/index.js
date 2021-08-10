import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'
import Button from '../../../../components/elements/Button'
import FieldGroup from '../../../../components/elements/FieldGroup'
import TextArea from '../../../../components/elements/TextArea'

const Edit = () => {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState({})
  const [postTitle, setPostTitle] = useState('')
  const [postMessage, setPostMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const token = localStorage.getItem('userToken')

  if (id && !post.title) {
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `${token}`
    }
    fetch('https://php-project.test/api/post/' + id + '/edit', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((result) => {
        setPost(result.post)
        setPostTitle(result.post.title)
        setPostMessage(result.post.message)
      })
      .catch(function () {
        // you get here if user cant edit the post or post does not exist
        // add message - redirect back
        router.push('/')
      })
  }

  function handleTitleChange(event) {
    setPostTitle(event.target.value)
  }

  function handleMessageChange(event) {
    setPostMessage(event.target.value)
  }

  function handleSubmit(event) {
    ////
    event.preventDefault()
    const headers = {}
    if (token) {
      headers.Authorization = `${token}`
    }

    const formData = new FormData()
    formData.append('title', postTitle)
    formData.append('message', postMessage)

    fetch('https://php-project.test/api/post/' + id + '/edit', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        // add message - redirect back

        if (result.session_success) {
          router.push('/')
        }

        if (result.message_err) {
          setErrorMessage(result.message_err)
        }

        if (result.title_err) {
          setErrorMessage(result.title_err)
        }
      })
      .catch(function (error) {
        // you get here if user cant edit the post or post does not exist
        // add message - redirect back
        console.log(error)
      })
  }

  function deletePost() {
    const confirmed = confirm('Are you sure you want to delete your post?')

    if (confirmed) {
      const headers = {}
      if (token) {
        headers.Authorization = `${token}`
      }

      fetch('https://php-project.test/api/post/' + id + '/delete', {
        method: 'POST',
        headers,
        credentials: 'same-origin',
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          // add message - redirect back
          if (result.session_success) {
            router.push('/')
          }
        })
        .catch(function (error) {
          // you get here if user cant edit the post or post does not exist
          // add message - redirect back
          console.log(error)
        })
    }
  }
  return (
    <>
      <Head>
        <title>Edit Post</title>
      </Head>
      <div className="wrapper">
        <h1>Edit your post</h1>
        <form onSubmit={handleSubmit} method="post" className="form">
          <FieldGroup
            id="title"
            label="Title"
            inputType="text"
            value={postTitle}
            setMethod={handleTitleChange}
          />
          <TextArea
            id="message"
            setMethod={handleMessageChange}
            value={postMessage}
            label="Message"
          />
          {errorMessage &&
            <p className="form__error">{errorMessage}</p>
          }
          <div className="form__group actions">
            <Button type="submit" text="Save new message" />
          </div>
        </form>
        <div className="post__actions">
          <Button
            type="button"
            text="Delete Post"
            cssClass="delete"
            onClick={deletePost}
          />
          <a href="/">Cancel</a>
        </div>
      </div>
    </>
  )
}

export default Edit
