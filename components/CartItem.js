import styles from '../styles/Cart.module.css'
import { fromImgToUrl, API_URL, BRAND_NAME } from '../utils/urls'
import { useContext } from 'react'

import CartContext from '../context/CartContext'

export default function CartItem({product}) {

  const { removeFromProducts, addOne, subtractOne } = useContext(CartContext);

  return (
    <div key={product.title} className={styles.cart_item}>
      <div className={styles.image_wrapper}>
        <img src={fromImgToUrl(product.image)} alt=""/>
      </div>
      <div className={styles.cart_item__contents}>
        <h4>{product.title}</h4>
        <h5>${product.price}</h5>
        <h4 className={styles.remove_item} onClick={() => {removeFromProducts(product)}}>remove</h4>
      </div>
      <div className={styles.cart_item__amount}>
        <h4 className={styles.item_total_title}>Total</h4>
        <h4 className={styles.item_total_amount}>${parseFloat((product.price * product.cart_amount)).toFixed(2)}</h4>
        <h4 className={styles.item_total_amount}>&nbsp;</h4>
      </div>
      <div className={styles.cart_item__controls}>
        <img className={styles.item_up} onClick={() => {addOne(product)}} src="/arrow.svg"/>
        <p className={styles.item_amount}>{product.cart_amount}</p>
        <img className={styles.item_down} onClick={() => {subtractOne(product)}} src="/arrow.svg"/>
      </div>
    </div>
  )
}
