import { useCheckout } from 'src/components/Checkout'

import { SignInForm } from '../SignIn/SignInForm'
import { useSignIn } from '../SignIn/hooks'
import { Loader } from '../UI'

export const SetCustomer = () => {
  const { setCustomer } = useCheckout()
  const { onSubmit, loading, error } = useSignIn({
    onComplete: () => setCustomer({ customerSource: 'AUTH' }),
  })

  if (loading) {
    return <Loader type="BLOCK" />
  }

  return (
    <div className="set-customer">
      <h2>Sign In or Continue as Guest</h2>
      <div className="set-customer-options">
        <div className="options-item options-item-signin">
          <SignInForm onSubmit={onSubmit} loading={loading} error={error} />
        </div>
        <div className="options-item options-item-guest">
          <button>Continue as Guest</button>
        </div>
      </div>
    </div>
  )
}
