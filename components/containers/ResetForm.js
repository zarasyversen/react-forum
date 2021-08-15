import Button from '../elements/Button'
import FieldGroup from '../elements/FieldGroup'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function ReesetForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append('new_password', password)
    formData.append('confirm_password', confirmPassword)

    const token = localStorage.getItem('userToken')
    const headers = {}

    if (token) {
      headers.Authorization = `${token}`
    }

    fetch('https://php-project.test/api/reset/password', {
      method: 'POST',
      body: formData,
      headers,
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then(
        (result) => {
          if (result.newPasswordError) {
            setErrorMessage(result.newPasswordError)
          }

          if (result.confirmPasswordError) {
            setErrorMessage(result.confirmPasswordError)
          }

          if (result.session_success) {
            localStorage.removeItem('userToken')
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
      <p>Please fill out this form to reset your password.</p>
      <FieldGroup
        id="new_password"
        label="New Password"
        inputType="password"
        value={password}
        setMethod={setPassword}
      />
      <FieldGroup
        id="confirm_password"
        label="Confirm Password"
        inputType="password"
        value={confirmPassword}
        setMethod={setConfirmPassword}
      />
      {errorMessage && <p className="form__error">{errorMessage}</p>}
      <div className="form__group actions">
        <Button type="submit" text="Submit" />
        <Link href="/">
          <a>Cancel</a>
        </Link>
      </div>
    </form>
  )
}
