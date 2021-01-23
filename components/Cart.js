import { useContext } from 'react'

import styles from '../styles/Cart.module.css'
import CartItem from '../components/CartItem'
import CartContext from '../context/CartContext'

export default function Cart() {
  const { products, total, redirectToCheckout, isOpen, setIsOpen } = useContext(CartContext)
  return (
    <div className={`${styles.cart_overlay} ${isOpen && styles.show}`}>
      <div className={`${styles.cart} ${isOpen && styles.show}`}>
          <span className={styles.close_cart}>
              <img src="/x.svg" onClick={() => {setIsOpen(false)}}/>
          </span>
          <h2>My Cart</h2>
          <div className={styles.cart_content}>
            {products.map(product => (<CartItem product={product} key={product.id}/> ))}
          </div>
          <div className={styles.cart_footer}>
              <h3 className={styles.cart_total}>Total: <span>${total.toFixed(2)}</span></h3>
              <button className={`${styles.checkout_btn_cart} ${styles.banner_btn}`} onClick={redirectToCheckout}>Checkout</button>
          </div>
      </div>
    </div>
  )
}
