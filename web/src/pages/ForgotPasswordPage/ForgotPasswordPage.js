import { useState } from 'react'
import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

import { GlobalLayout } from 'src/layouts'

const ForgotPasswordPage = () => {
  const { client } = useAuth()
  const [formError, setFormError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  const onSubmit = (data) => {
    setFormLoading(true)
    setFormError(null)
    client
      .requestPasswordRecovery(data.email)
      .then(() => {
        navigate(routes.resetPassword())
      })
      .catch((error) => {
        console.dir(error)
        setFormError(error.message)
        setFormLoading(false)
      })
  }

  return (
    <GlobalLayout>
      <h2>Recover Password</h2>
      <p>
        Please enter your email to receive instructions for resetting your
        password.
      </p>
      <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
        {formError && <p className="form-error">{formError}</p>}

        <div className="field">
          <Label name="email" errorClassName="label-error">
            Email
          </Label>
          <TextField
            name="email"
            validation={{
              required: 'Email is required.',
              pattern: {
                value: /[^@]+@[^.]+\..+/,
                message: 'Please enter a valid email address',
              },
            }}
            errorClassName="input-error"
          />
          <FieldError name="email" className="field-error" />
        </div>
        <div className="field">
          <Submit className="btn" disabled={formLoading}>
            Submit
          </Submit>
        </div>
      </Form>
    </GlobalLayout>
  )
}

export default ForgotPasswordPage
