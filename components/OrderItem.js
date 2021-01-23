import {useState} from 'react'
import { fromImgToUrl } from '../utils/urls'

import styles from '../styles/OrderItem.module.css'
import Link from 'next/link'

export default function OrderItem({order}) {
  const [showDetails, setShowDetails] = useState(false)
  return (

    <>
      <div key={order.id} className={styles.table}>
        <div className={styles.table_row}>
          <div>
            <h4>Date</h4>
            <h4>{new Date(order.created_at).toLocaleDateString('en-US')}</h4>
          </div>
          <div>
            <h4>Total</h4>
            <h4>${order.total}</h4>
          </div>
          <div>
            <h4>ID</h4>
            <h4>{order.id}</h4>
          </div>
          <div className={styles.status}>
            <h4>Status</h4>
            <p className={styles[order.status]}>{order.status}</p>
          </div>
          <div>
          <svg onClick={() => setShowDetails(!showDetails)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>
          </div>
        </div>
        <div className={`${styles.product_list_body_wrapper} ${showDetails ? styles.show : ''}`}>
        {order.products_list.map(product => {
          return (
          <div key={product.id} className={styles.product_list_body}>
              <div>
              <Link href={`/products/${product.slug}`}>
                <a className={styles.product_list_body_image}>
                  <img src={fromImgToUrl(product.image)} onError={(e) => {e.target.src='/not-found.jpg'}}/>
                </a>
              </Link>
              </div>
              <div>
                <Link href={`/products/${product.slug}`}>
                  <a className={styles.product_list_body_title}>
                  <p>{product.title}</p>
                  </a>
                </Link>
                <p className={styles.product_list_body_amount}>${product.price} <span>x</span> {product.cart_amount}</p>
                <p className={styles.product_list_body_price}><span>Total:</span>${(+product.cart_amount * +product.price).toFixed(2)}</p>
              </div>
          </div>
          )
        })}
        </div>
      </div>
    </>
  
  )
}
