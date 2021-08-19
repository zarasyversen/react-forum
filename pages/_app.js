import '../styles/globals.css'
import Footer from '../components/presentational/Footer'
import { MessageProvider } from '../components/Message'

function MyApp({ Component, pageProps }) {
  return (
    <MessageProvider>
      <Component {...pageProps} />
      <Footer />
    </MessageProvider>
  )
  
}

export default MyApp
