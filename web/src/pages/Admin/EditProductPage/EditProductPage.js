import ProductsLayout from 'src/layouts/Admin/ProductsLayout'
import EditProductCell from 'src/components/Admin/EditProductCell'

const EditProductPage = ({ id }) => {
  return (
    <ProductsLayout>
      <EditProductCell id={id} />
    </ProductsLayout>
  )
}

export default EditProductPage
