import Header from 'src/components/Header/Header'

const GlobalLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer className="footer">
        <p>
          <a href="https://github.com/Terris/redwood-stripe-example">
            <img
              src="/github-logo.svg"
              alt="GitHub"
              style={{ width: '18px' }}
            />
            GET THE CODE
          </a>
        </p>
      </footer>
    </>
  )
}

export default GlobalLayout
