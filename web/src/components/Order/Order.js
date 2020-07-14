import { useParams } from '@redwoodjs/router'

import { useOrder } from 'src/components/Order'

import { Loader } from '../UI'

export const Order = () => {
  const { id } = useParams()
  const { order, loading, error } = useOrder({ id })

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div>
      <h2>Order {id}</h2>
      <pre>
        <code>{JSON.stringify(order, null, '\t')}</code>
      </pre>
    </div>
  )
}
