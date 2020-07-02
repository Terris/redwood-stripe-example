import { ProductListProduct } from './ProductListProduct'
const ProductList = ({ products }) => (
  <div className="product-list">
    {products &&
      products.map((product) => (
        <ProductListProduct key={product.id} product={product} />
      ))}
  </div>
)

export default ProductList
