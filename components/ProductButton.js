import { useContext } from 'react';
import { useRouter } from'next/router';

import styles from '../styles/BuyButton.module.css';
import AuthContext from '../context/AuthContext'


export default function ProductButton({ product }) {
  const { user, setProduct } = useContext(AuthContext); 

  const router = useRouter()

  const redirectToLogin = () => {
    router.push('/login')
  }
  
  const redirectToCheckout = () => {
    setProduct({ ...product })
    router.push('/checkout')
  }

  return (
    <>
      {!user &&
        <button className={styles.buy} onClick={redirectToLogin}>
          Login to Buy
        </button>
      }
      {user &&
        <>
          <button className={styles.buy} onClick={redirectToCheckout}>
            Buy
          </button>
        </>
      }
    </>
  )
}
