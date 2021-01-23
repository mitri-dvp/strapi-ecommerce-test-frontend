import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { API_URL } from '../../utils/urls'

import Header from '../../components/Header'
import viewStyles from '../../styles/View.module.css'
import styles from '../../styles/Success.module.css'
import Head from 'next/head'
import CartContext from '../../context/CartContext'

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const { clearCart } = useContext(CartContext); 

  useEffect(() => {
    const fetchOrder = async () => {
      if(session_id) {
        setLoading(true)

        try {
          const res = await fetch(`${API_URL}/orders/confirm?provider=stripe`, {
            method: 'POST',
            body: JSON.stringify({ checkout_session: session_id }),
            headers: {
              'Content-type': `application/json`,
            }
          })

          const data = await res.json()
          console.log(data)
          setOrder(data)
          clearCart()
        } catch (error) {
          setOrder(null)
        }
        setLoading(false)
      }
    }
    fetchOrder()
  }, [session_id])

  return {order, loading}
}

export default function success({categories}) {

  const router = useRouter()
  const { session_id } = router.query

  const redirectToProfilePage = () => {
    router.push('/profile')
  }

  const { order, loading } = useOrder(session_id)

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
