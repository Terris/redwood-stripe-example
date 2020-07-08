import { useState } from 'react'
import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/web'

export const SetShipping = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
  })

  const onSubmit = async (data) => {
    setState({ ...state, error: null, loading: true })
    console.log(data)
    // do the thing
  }

  return (
    <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
      {state.error && <p className="form-error">{state.error}</p>}
      <h4 style={{ paddingBottom: '0' }}>Shipping Address</h4>
      <div className="field">
        <Label name="addressLine1" errorClassName="label-error">
          Street
        </Label>
        <TextField
          name="addressLine1"
          placeholder="123 Short Circuit Drive"
          validation={{
            required: 'Street address is required',
          }}
          errorClassName="input-error"
        />
        <FieldError name="addressLine1" className="field-error" />
      </div>

      <div className="field" style={{ paddingTop: '0' }}>
        <TextField
          name="addressLine2"
          placeholder="#5"
          errorClassName="input-error"
        />
      </div>
      <div className="field-group">
        <div className="field" style={{ width: '66.666666%' }}>
          <Label name="addressCity" errorClassName="label-error">
            City
          </Label>
          <TextField
            name="addressCity"
            placeholder="Bishop"
            validation={{
              required: 'City is required.',
            }}
            errorClassName="input-error"
          />
          <FieldError name="addressCity" className="field-error" />
        </div>

        <div className="field" style={{ width: '33.333333%' }}>
          <Label name="addressState" errorClassName="label-error">
            State
          </Label>
          <TextField
            name="addressState"
            placeholder="AI"
            validation={{
              required: 'State is required.',
            }}
            errorClassName="input-error"
          />
          <FieldError name="addressState" className="field-error" />
        </div>

        <div className="field" style={{ width: '33.333333%' }}>
          <Label name="addressPostalCode" errorClassName="label-error">
            Postal Code
          </Label>
          <TextField
            name="addressPostalCode"
            placeholder="W9 1ER"
            validation={{
              required: 'State is required.',
            }}
            errorClassName="input-error"
          />
          <FieldError name="addressPostalCode" className="field-error" />
        </div>
      </div>

      <div className="field">
        <Submit className="btn" disabled={state.loading}>
          Submit
        </Submit>
      </div>
    </Form>
  )
}
