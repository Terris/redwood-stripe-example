import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/web'

import ProductImageField from './ProductImageField'

const MAX_PRODUCT_IMAGES = 8

const ProductForm = (props) => {
  const [productImages, setProductImages] = React.useState(
    props.product?.images || []
  )
  const onSubmit = (data) => {
    const coercedData = {
      ...data,
      unitAmount: parseInt(data.unitAmount), // convert string to integer
      images: data.images?.filter(Boolean), // remove falsy values
    }
    props.onSave(coercedData, props?.product?.id)
  }

  const addBlankImage = () => {
    setProductImages((imgs) => {
      return [...imgs, '']
    })
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.product?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>
        <TextField
          name="description"
          defaultValue={props.product?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="description" className="rw-field-error" />

        <Label
          name="unitAmount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Unit Amount
        </Label>
        <p style={{ padding: 0 }}>Enter in cents, e.g. 1099 = 10.99</p>
        <NumberField
          name="unitAmount"
          defaultValue={props.product?.unitAmount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="unitAmount" className="rw-field-error" />

        {productImages.map((img, index) => (
          <ProductImageField key={`img_${index}`} image={img} imageId={index} />
        ))}

        <p style={{ paddingLeft: 0, paddingRight: 0 }}>
          <button
            className="rw-button"
            disabled={productImages.length === MAX_PRODUCT_IMAGES}
            onClick={() => addBlankImage()}
            type="button"
          >
            <div className="rw-button-icon">+</div> product image
          </button>
        </p>

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProductForm
