import Button from '../elements/Button'
import FieldGroup from '../elements/FieldGroup'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginForm () {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  function handleSubmit (event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    fetch('https://php-project.test/api/login', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(
        (result) => {

          if (result.missingUsername || result.missingPassword) {
            if (result.missingUsername) {
              setErrorMessage(result.missingUsername)
            }

            if (result.missingPassword) {
              setErrorMessage(result.missingPassword)
            }

            return
          }

          if (result.session_error) {
            setErrorMessage(result.session_error)
          }

          if (result.username && result.password) {
            localStorage.setItem('userToken', result.token)
            router.reload()
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
      <h2>Login</h2>
      <p>Please fill in your credentials to login.</p>
      <FieldGroup
        id="username"
        label="Username"
        inputType="text"
        value={username}
        autocomplete="username"
        setMethod={setUserName}
      />
      <FieldGroup
        id="password"
        label="Password"
        inputType="password"
        value={password}
        autocomplete="current-password"
        setMethod={setPassword}
      />
      {errorMessage &&
        <p className="form__error">{errorMessage}</p>
      }
      <div className="form__group actions">
        <Button type="submit" text="Login"/>
      </div>
    </form>
  )
}
