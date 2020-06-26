import Header from 'src/components/Header/Header'

const GlobalLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default GlobalLayout
