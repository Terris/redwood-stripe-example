import { AuthProvider } from '@redwoodjs/auth'
import ReactDOM from 'react-dom'
import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'

import { goTrue } from 'src/lib'
import { CartProvider } from 'src/components/Cart'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <AuthProvider client={goTrue} type="goTrue">
      <RedwoodProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </RedwoodProvider>
    </AuthProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
)
