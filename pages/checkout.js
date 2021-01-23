import { useContext } from 'react'
import { useRouter } from 'next/router'
import { API_URL, BRAND_NAME } from '../utils/urls'

import Header from '../components/Header'
import viewStyles from '../styles/View.module.css'
import styles from '../styles/Checkout.module.css'
import Head from 'next/head'
import BuyButton from '../components/BuyButton'
import PaypalButton from '../components/PaypalButton'
import CartCheckout from '../components/CartCheckout'



import AuthContext from '../context/AuthContext'

export default function Checkout({categories}) {
  const { user } = useContext(AuthContext);

  const router = useRouter()

  const redirectToLogin = () => {
    router.push('/login')
  }

  return (
    <>
      <Head>        
        <meta httpEquiv="Content-Type" content="text/html"/>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/brand-logo.png" />
        <title>Checkout | {BRAND_NAME}</title>
        <meta name="description" content={`${BRAND_NAME} checkout page.`} />
      </Head>

      <Header categories={categories}/>
      
      <div className={viewStyles.view}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Checkout</h2>

          <div>
            <div className={styles.cart_checkout_wrapper}>
              <CartCheckout/>
            </div>
            {!user &&
              <button className={`${styles.button} ${styles.payment_options}`}onClick={redirectToLogin}>
                Login to Buy
              </button>
            }
            {user &&
              <div className={styles.payment_options}>
                <BuyButton />
                <PaypalButton />
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

// NextJS Fetch and Return Data as Prop
export async function getStaticProps() {
  // Fetch products
  const categories_res = await fetch(`${API_URL}/categories/`)
  const categories = await categories_res.json()

  // Return products as props
  return {
    props: {
      categories
    }
  }
}