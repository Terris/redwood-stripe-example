import { Order } from 'src/components/Order'
import { GlobalLayout } from 'src/layouts'

const OrdersPage = () => {
  return (
    <GlobalLayout>
      <h1>Order Receipt</h1>
      <Order />
    </GlobalLayout>
  )
}

export default OrdersPage
