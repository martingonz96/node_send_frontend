import Appstate from '../context/appContext/appState'
import AuthState from '../context/contextAuth/authState'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <Appstate>
         <Component {...pageProps} />
      </Appstate>
    </AuthState>
  )
}

export default MyApp
