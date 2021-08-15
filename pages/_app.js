import '../styles/globals.css'
import Footer from '../components/presentational/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  )
  
}

export default MyApp
