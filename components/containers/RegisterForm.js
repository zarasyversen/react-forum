import Button from '../elements/Button'
import FieldGroup from '../elements/FieldGroup'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function RegisterForm () {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  function handleSubmit (event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('confirm_password', confirmPassword)

    fetch('http://php-project.test/api/register', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(
        (result) => {
          console.log(result)

          if (result.missingUsername || result.missingPassword || result.confirmPassword) {
            if (result.missingUsername) {
              setErrorMessage(result.missingUsername)
            }

            if (result.missingPassword) {
              setErrorMessage(result.missingPassword)
            }

            if (result.confirmPassword) {
              setErrorMessage(result.confirmPassword)
            }

            return
          }

          if (result.session_success) {
            router.push('/')
          }
        },

        (error) => {
          console.log(error)
        }
      )
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <p>Please fill in this form to create an account.</p>
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
        autocomplete="new-password"
        setMethod={setPassword}
      />
      <FieldGroup
        id="confirm_password"
        label="Confirm Password"
        inputType="password"
        value={confirmPassword}
        autocomplete="new-password"
        setMethod={setConfirmPassword}
      />
      {errorMessage &&
        <p className="form__error">{errorMessage}</p>
      }
      <div className="form__group actions">
        <Button type="submit" text="Submit"/>
        <input type="reset" className="btn" value="Reset"/>
      </div>
    </form>
  )
}
