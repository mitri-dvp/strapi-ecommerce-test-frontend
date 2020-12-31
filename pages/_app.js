import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <content>
        <Header />
        <div>
          <div className={'view'}>
          <Component {...pageProps} />
          </div>
        </div>
        <Footer/>
      </content>
    </AuthProvider>
  )
}

export default MyApp
