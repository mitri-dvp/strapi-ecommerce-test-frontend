import { useContext } from 'react'

import styles from '../styles/CartButton.module.css'
import CartContext from '../context/CartContext'

export default function CartButton({disabled}) {
  const { itemCount, setIsOpen, isOpen } = useContext(CartContext)

  if(disabled) {
    return (
      <div className={styles.cart_btn}>
        <img src="/cart.svg"/>
        <span>{itemCount}</span>
      </div>
    )
  }
  return (
    <div className={styles.cart_btn} onClick={() => setIsOpen(true)}>
      <img src="/cart.svg"/>
      <span>{itemCount}</span>
    </div>
  )
}
