import { useState } from 'react'
import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/web'

import { useCheckout } from 'src/components/Checkout'

export const SetShipping = () => {
  const { setShipping } = useCheckout()
  const [state, setState] = useState({
    loading: false,
    error: null,
  })

  const onSubmit = async (input) => {
    setState({ ...state, error: null, loading: true })
    setShipping({ input }).catch((error) => {
      setState({ ...state, error: error.message, loading: false })
    })
  }

  return (
    <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
      {state.error && <p className="form-error">{state.error}</p>}
      <h4 style={{ paddingBottom: '0' }}>Shipping Address</h4>
      <div className="field">
        <Label name="name" errorClassName="label-error">
          Name (on package)
        </Label>
        <TextField
          name="name"
          placeholder="Bender Bending Rodriguez"
          validation={{
            required: 'Name is required',
          }}
          errorClassName="input-error"
        />
        <FieldError name="name" className="field-error" />
      </div>

      <div className="field">
        <Label name="line1" errorClassName="label-error">
          Street
        </Label>
        <TextField
          name="line1"
          placeholder="123 Short Circuit Drive"
          validation={{
            required: 'Street address is required',
          }}
          errorClassName="input-error"
        />
        <FieldError name="line1" className="field-error" />
      </div>

      <div className="field" style={{ paddingTop: '0' }}>
        <TextField name="line2" placeholder="#5" errorClassName="input-error" />
      </div>
      <div className="field-group">
        <div className="field" style={{ width: '66.666666%' }}>
          <Label name="city" errorClassName="label-error">
            City
          </Label>
          <TextField
            name="city"
            placeholder="Bishop"
            validation={{
              required: 'City is required.',
            }}
            errorClassName="input-error"
          />
          <FieldError name="city" className="field-error" />
        </div>

        <div className="field" style={{ width: '33.333333%' }}>
          <Label name="state" errorClassName="label-error">
            State
          </Label>
          <TextField
            name="state"
            placeholder="AI"
            validation={{
              required: 'State is required.',
            }}
            errorClassName="input-error"
          />
          <FieldError name="state" className="field-error" />
        </div>

        <div className="field" style={{ width: '33.333333%' }}>
          <Label name="postalCode" errorClassName="label-error">
            Postal Code
          </Label>
          <TextField
            name="postalCode"
            placeholder="W9 1ER"
            validation={{
              required: 'Postal Code is required.',
            }}
            errorClassName="input-error"
          />
          <FieldError name="postalCode" className="field-error" />
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
