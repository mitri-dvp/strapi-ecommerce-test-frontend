import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API_URL } from '../../utils/urls'

import styles from '../../styles/Success.module.css'
import Head from 'next/head'

const useOrder = (query) => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const { paymentId, token, PayerID } = query

  useEffect(() => {
    const fetchOrder = async () => {

      if(paymentId) {
        setLoading(true)

        try {
          const res = await fetch(`${API_URL}/orders/confirm?provider=paypal`, {
            method: 'POST',
            body: JSON.stringify({ paymentId, token, PayerID }),
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
  }, [paymentId])

  return {order, loading}
}

export default function success() {

  const router = useRouter()
  const { order, loading } = useOrder(router.query)

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
