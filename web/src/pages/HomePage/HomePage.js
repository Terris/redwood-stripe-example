import { GlobalLayout } from 'src/layouts'
import { useHashRedirects } from 'src/hooks'
import ProductListCell from 'src/components/ProductList/ProductListCell'

const HomePage = () => {
  useHashRedirects()
  return (
    <GlobalLayout>
      <ProductListCell />
    </GlobalLayout>
  )
}

export default HomePage
