import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'

const Edit = () => {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState({})
  const [postTitle, setPostTitle] = useState('')
  const [postMessage, setPostMessage] = useState('')

  const token = localStorage.getItem('userToken');

  if (id && !post.title) {
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
      headers.Authorization = `${token}`
    }
    fetch('https://php-project.test/api/post/' + id + '/edit', {
      method: 'POST',
      headers,
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then((result) => {
            setPost(result.post)
            setPostTitle(result.post.title)
            setPostMessage(result.post.message)
        }
      )
      .catch(function() {
          // you get here if user cant edit the post or post does not exist
          // add message - redirect back
          router.push('/');
    });
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
      body: formData
    })
      .then(response => response.json())
      .then((result) => {
          console.log(result)
          // add message - redirect back
          router.push('/');
        }
      )
      .catch(function(error) {
          // you get here if user cant edit the post or post does not exist
          // add message - redirect back
          console.log(error);
    });
  }

  function deletePost() {
    const confirmed = confirm('Are you sure you want to delete your post?');

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
        .then(response => response.json())
        .then((result) => {
            console.log(result)
            // add message - redirect back
            router.push('/');
          }
        )
        .catch(function(error) {
            // you get here if user cant edit the post or post does not exist
            // add message - redirect back
            console.log(error);
      });
    }
  }
  return (
    <>
    <Head>
        <title>Edit Post</title>
    </Head>
    <div className="wrapper">
        <h1>Edit your post</h1>
        <form onSubmit={handleSubmit}
        method="post" 
        className="form">
        <div className="form__group">
                <label htmlFor="title">Title</label>
                <input 
                type="text" 
                name="title" 
                id="title" 
                className="form__input"
                value={postTitle}
                onChange={handleTitleChange}
                />
            </div>    
            <div className="form__group">
                <label htmlFor="message">Message</label>
                <textarea 
                id="message" 
                name="message" 
                className="form__input"
                placeholder="Please enter your message here..."
                onChange={handleMessageChange}
                value={postMessage}
                rows="5" 
                cols="33"></textarea>
            </div>
            <div className="form__group actions">
                <button type="submit" className="btn btn--primary">Save new message</button>
            </div>
        </form>
        <div className="post__actions">
            <button type="button" className="btn btn--primary delete" onClick={deletePost}>Delete Post</button>
            <a href="/">Cancel</a>
        </div>
    </div>
    </>
  )
}

export default Edit
