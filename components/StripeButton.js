import { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PK, API_URL } from '../utils/urls'

import styles from '../styles/StripeButton.module.css';
import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'

const stripePromise = loadStripe(STRIPE_PK)

export default function StripeButton({disabled, setDisabled}) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { getToken } = useContext(AuthContext);
  const { getProducts, total } = useContext(CartContext); 

  const handleBuy = async () => {
    if(loading) return
    if(disabled) return
    setError(false)
    setDisabled(true)
    setLoading(true)

    const products = getProducts()

    const stripe = await stripePromise
    const token = await getToken()

    const res = await fetch(`${API_URL}/orders?provider=stripe`, {
      method: 'POST',
      body: JSON.stringify({ products, total: +total.toFixed(2) }),
      headers: {
        'Content-type': `application/json`,
        'Authorization': `Bearer ${token}`,
      }
    })
    const data = await res.json()

    if(data.error) {
      setError(true)
      setDisabled(false)
      setLoading(false)
      return
    }

    const {id, products_list} = data

    sessionStorage.setItem('StripeItems', JSON.stringify(products_list))

    const result = await stripe.redirectToCheckout({sessionId: id})
  }

  return (
    <>
      <button className={`${styles.buy} ${loading && styles.loading_wrapper}`} onClick={handleBuy}>
        Buy
        {loading && <div className={`spinner ${styles.loading}`}></div>}
      </button>
      {error && (
        <div className={styles.error}>
          An error ocurred, please try again.
        </div>
      )}
    </>
  )
}
