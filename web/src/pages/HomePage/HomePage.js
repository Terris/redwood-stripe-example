import { useHashRedirects } from 'src/hooks'

const HomePage = () => {
  useHashRedirects()

  return (
    <div>
      <h1>HomePage</h1>
      <p>Find me in ./web/src/pages/HomePage/HomePage.js</p>
    </div>
  )
}

export default HomePage
