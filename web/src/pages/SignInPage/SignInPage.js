import { useState } from 'react'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

import { GlobalLayout } from 'src/layouts'

const SignInPage = () => {
  const { logIn } = useAuth()
  const [formError, setFormError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  const onSubmit = (data) => {
    setFormLoading(true)
    setFormError(null)
    logIn({ email: data.email, password: data.password, remember: true })
      .then(() => {
        navigate(routes.home())
      })
      .catch((error) => {
        setFormError(error.json.error_description)
        setFormLoading(false)
      })
  }

  return (
    <GlobalLayout>
      <h1>Sign In</h1>
      <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
        {formError && <div className="form-error">{formError}</div>}

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
          <Label name="password" errorClassName="label-error">
            Password
          </Label>
          <PasswordField
            name="password"
            validation={{
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
            }}
            errorClassName="input-error"
          />
          <FieldError name="password" className="field-error" />
        </div>
        <div className="field">
          <Submit className="btn" disabled={formLoading}>
            Sign In
          </Submit>
        </div>
      </Form>
      <p>
        <Link to={routes.forgotPassword()}>Forgot password?</Link>
      </p>
    </GlobalLayout>
  )
}

export default SignInPage
