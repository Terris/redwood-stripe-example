import { Label, UrlField, FieldError } from '@redwoodjs/web'

const ProductImageField = ({ image, imageId }) => {
  return (
    <>
      <Label
        name={`images[${imageId}]`}
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Product Image URL
      </Label>
      <UrlField
        name={`images[${imageId}]`}
        defaultValue={image}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
      />
      <FieldError name={`images[${imageId}]`} className="rw-field-error" />
    </>
  )
}

export default ProductImageField
