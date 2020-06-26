import { GlobalLayout } from 'src/layouts'
import { useHashRedirects } from 'src/hooks'

const HomePage = () => {
  useHashRedirects()

  return (
    <GlobalLayout>
      <h1>HomePage</h1>
      <p>Find me in ./web/src/pages/HomePage/HomePage.js</p>
    </GlobalLayout>
  )
}

export default HomePage
