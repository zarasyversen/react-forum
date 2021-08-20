import Button from '../elements/Button'
import FieldGroup from '../elements/FieldGroup'
import TextArea from '../elements/TextArea'
import { useState } from 'react'
import { useDispatchMessage } from '../Message'

export default function NewPost ( props ) {
  const [postTitle, setPostTitle] = useState('')
  const [postMessage, setPostMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatchMessage()

  function handleSubmit (event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append('title', postTitle)
    formData.append('message', postMessage)

    const token = localStorage.getItem('userToken')
    const headers = {}
    if (token) {
      headers.Authorization = `${token}`
    }

    fetch('https://php-project.test/api/post/create', {
      method: 'POST',
      headers,
      body: formData,
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(
        (result) => {
          if (result.message_err) {
            setErrorMessage(result.message_err)
          }
  
          if (result.title_err) {
            setErrorMessage(result.title_err)
          }

          if (result.session_success) {
            dispatch({
              type: 'SET_MESSAGE',
              text: result.session_success,
              messageType: 'success'
            })
            // posted add message
            // update post list 
            setPostTitle('')
            setPostMessage('')
            props.updatePostsMethod()
          }
        },

        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        }
      )
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Post a message</h2>
      <FieldGroup
            id="title"
            label="Title"
            inputType="text"
            value={postTitle}
            setMethod={setPostTitle}
            placeHolder="Title"
          />
          <TextArea
            id="message"
            setMethod={setPostMessage}
            value={postMessage}
            label="Message"
          />
          {errorMessage &&
            <p className="form__error">{errorMessage}</p>
          }
      <div className="form__group actions">
        <Button type="submit" text="Submit Message"/>
      </div>
    </form>
  )
}
