import styles from '../styles/CartCheckout.module.css'
import { fromImgToUrl, API_URL, BRAND_NAME } from '../utils/urls'
import { useContext, useState } from 'react'

import CartContext from '../context/CartContext'

export default function CartCheckoutItem({product}) {

  const { inStock, isInStock } = useState(false)

  // Check for stock

  return (
    <tr key={product.title}>  
      <td className={styles.cart_checkout__img}>
        <img src={fromImgToUrl(product.image)} alt=""/>
        {/* {!inStock ? (
          // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.product_in_stock} viewBox="0 0 16 16">
          //   <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
          // </svg>
          <div className={styles.product_in_stock}>
            available
          </div>

        ) : (
          // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.product_out_stock} viewBox="0 0 16 16">
          //   <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          // </svg>
          <div className={styles.product_out_stock}>
            not available
          </div>
        )} */}
      </td>

      <td>
        <h4>&nbsp;</h4>
        <h4 className={styles.cart_checkout__title}>{product.title}</h4>
        <h4>&nbsp;</h4>
      </td>

      <td>
        <h4>&nbsp;</h4>
        <h4>${product.price}</h4>
        <h4>&nbsp;</h4>
      </td>

      <td> 
        <h4>&nbsp;</h4>
        <p className={styles.item_amount}>{product.cart_amount}</p>
        <h4>&nbsp;</h4>
      </td>

      <td>
        <h4>&nbsp;</h4>
        <h4 className={styles.item_total_amount}>${parseFloat((product.price * product.cart_amount)).toFixed(2)}</h4>
        <h4>&nbsp;</h4>
      </td>
    </tr>
  )
}
