import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API_URL } from '../../utils/urls'

import styles from '../../styles/Success.module.css'
import Head from 'next/head'

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)

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
          setOrder(data)
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

export default function success() {

  const router = useRouter()
  const { session_id } = router.query

  const { order, loading } = useOrder(session_id)

  return (
    <div>
      <Head>
        <link rel="icon" href="/brand-logo.png" />
        <title>Thank you for your purchase</title>
        <meta name="description" content="Thank you for your purchase"/>
      </Head>

      <h2 className={styles.title}>Success!</h2>

      <h2></h2>
      {loading && <div className='spinner'></div>}

      {order &&
        <div className={styles.confirm_wrapper}>
          <p>Your order is confirmed with order number: <span className={styles.confirm_order}>{order.id}</span></p>
        </div>
        }
    </div>
  )
}
