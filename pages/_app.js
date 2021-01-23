import '../styles/globals.css'
import Footer from '../components/Footer'
import PoweredBy from '../components/PoweredBy'
import Cart from '../components/Cart'


import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'


function MyApp({ Component, pageProps }) {
  
  return (
    <CartProvider>
    <AuthProvider>
      <content>
        <div>
          <Component {...pageProps} />
        </div>
        <Footer/>
        <PoweredBy/>
        <Cart/>
      </content>
    </AuthProvider>
    </CartProvider>
  )
}

export default MyApp
