import { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PK, API_URL } from '../utils/urls'

import styles from '../styles/BuyButton.module.css';
import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'

const stripePromise = loadStripe(STRIPE_PK)

export default function BuyButton() {
  const [loading, setLoading] = useState(false)

  const { getToken } = useContext(AuthContext);
  const { products, total } = useContext(CartContext); 

  const handleBuy = async () => {
    if(loading) return
    setLoading(true)

    console.log(products, total)

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

    if(data.error) return

    const result = await stripe.redirectToCheckout({
      sessionId: data.id
    })
  }

  return (
    <>
      <button className={styles.buy} onClick={handleBuy}>
        Buy
      </button>
    </>
  )
}
