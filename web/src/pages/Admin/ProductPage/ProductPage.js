import ProductsLayout from 'src/layouts/Admin/ProductsLayout'
import ProductCell from 'src/components/Admin/ProductCell'

const ProductPage = ({ id }) => {
  return (
    <ProductsLayout>
      <ProductCell id={id} />
    </ProductsLayout>
  )
}

export default ProductPage
