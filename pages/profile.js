import styles from '../styles/Profile.module.css'
import Head from 'next/head'
import AuthContext from '../context/AuthContext'

import { useContext, useState, useEffect } from 'react'
import { API_URL, BRAND_NAME } from '../utils/urls'

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const fetchOrders = async () => {
      if(user) {
        try {
          setLoading(true)
          const token = await getToken()
          const order_res = await fetch(`${API_URL}/orders/`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          const data = await order_res.json()
          setOrders(data)
        } catch (error) {
          setOrders([])
        }
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  return {orders, loading}
}

export default function Profile() {

  const { user, GoogleLogoutBtn, getToken } = useContext(AuthContext)

  // Custom Hook
  const { orders, loading } = useOrders(user, getToken)

  console.log('Account.render Orders: ', orders)

  if(!user) {
    return (
      <div>
        <p>Please login or register</p>
      </div>
    )
  }

  return (
    <>
      <Head>        
        <meta httpEquiv="Content-Type" content="text/html"/>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Profile - {BRAND_NAME}</title>
        <meta name="description" content="The account page, view your orders and logout from mitri.dvp." />
      </Head>

      <h2 className={styles.title}>Profile Page</h2>

      <h3 className={styles.sub_title}>Your Orders</h3>

      {loading && <div className='spinner'></div>}
      
      <div className={styles.orders_list}>

        <div>
          <p>Date</p>
          <p>ID</p>
          <p>Title</p>
          <p>Total</p>
          <p>Status</p>
        </div>

        {orders.map(order => (
          <div key={order.id}>
            <p>{new Date(order.created_at).toLocaleDateString('en-US')}</p>
            <p>{order.id}</p>
            <p>{order.product.title}</p>
            <p>${order.total}</p>
            <p className={styles[order.status]}>{order.status}</p>
          </div>
        ))}
      </div>

      <div className={styles.login_providers}>
        <GoogleLogoutBtn/>
      </div>

    </>
  )
}
