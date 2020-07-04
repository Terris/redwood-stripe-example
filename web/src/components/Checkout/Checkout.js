import { useCheckout } from './hooks'

export const Checkout = () => {
  const { checkout, loading, error } = useCheckout()

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p className="text-error">{error.message}</p>
  }

  return (
    <div className="checkout">
      <h2>Checkout stuff</h2>
      {checkout && <p>{JSON.stringify(checkout)}</p>}
    </div>
  )
}
