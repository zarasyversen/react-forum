import '../styles/globals.css'
import { AuthContext } from '../state/AuthContext'

function MyApp ({ Component, pageProps }) {
  return (
    <AuthContext>
      <Component {...pageProps} />
    </AuthContext>
  )
}

export default MyApp
