import { Loader } from 'src/components/UI'

import { useCheckout } from './hooks'

export const Checkout = () => {
  const { checkout, loading, error } = useCheckout()

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p className="text-error">{error.message}</p>
  }

  return (
    <div className="checkout">
      <h2>Checkout stuff</h2>
      {checkout && <>{console.log(checkout)}</>}
      {checkout &&
        checkout.invoice.lines.map((item) => (
          <div key={item.id}>
            <h3>{item.id}</h3>
            <hr />
          </div>
        ))}
    </div>
  )
}
