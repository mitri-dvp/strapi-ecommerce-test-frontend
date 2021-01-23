import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { API_URL } from '../../utils/urls'

import Header from '../../components/Header'
import viewStyles from '../../styles/View.module.css'
import styles from '../../styles/Success.module.css'
import Head from 'next/head'
import CartContext from '../../context/CartContext'

const useOrder = (query) => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const { paymentId, token, PayerID } = query

  const { clearCart } = useContext(CartContext); 
  
  useEffect(() => {
    const transactions = JSON.parse(sessionStorage.getItem('PayPalTransactions'))
    const fetchOrder = async () => {

      if(paymentId) {
        setLoading(true)

        try {
          const res = await fetch(`${API_URL}/orders/confirm?provider=paypal`, {
            method: 'POST',
            body: JSON.stringify({ paymentId, token, PayerID, transactions }),
            headers: {
              'Content-type': `application/json`,
            }
          })

          const data = await res.json()
          setOrder(data)
          sessionStorage.removeItem('PayPalTransactions')
          clearCart()
        } catch (error) {
          setOrder(null)
        }

        setLoading(false)
      }
    }
    fetchOrder()
  }, [paymentId])

  return {order, loading}
}

export default function success({categories}) {

  const router = useRouter()
  const { order, loading } = useOrder(router.query)

  return (
    <div>
      <Head>
        <link rel="icon" href="/brand-logo.png" />
        <title>Thank you for your purchase!</title>
        <meta name="description" content="Thank you for your purchase."/>
      </Head>

      <Header categories={categories}/>
      
      <div className={viewStyles.view}>
        <div>
          
        {loading && <div className='spinner'></div>}
          {order &&
          <>
            <h2 className={styles.title}>Success!</h2>
            <div className={styles.confirm_wrapper}>
              <div>Your order is confirmed with order number: <span className={styles.confirm_order}>{order.id}</span></div>
              <div>Please check your Mail Inbox or your <span className={styles.link} onClick={redirectToProfilePage}>Profile Page</span>
                </div>
            </div>
          </>
          }
          </div>
      </div>
    </div>
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
