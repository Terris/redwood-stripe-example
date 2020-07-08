import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/web'

export const SignInForm = ({ onSubmit, loading, error }) => (
  <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
    {error && <p className="form-error">{error}</p>}
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
      <Submit className="btn" disabled={loading}>
        Sign In
      </Submit>
    </div>
  </Form>
)
