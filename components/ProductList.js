import styles from '../styles/ProductList.module.css'
import Link from 'next/link'
import { fromImgToUrl } from '../utils/urls' 
import { formatPrice } from '../utils/format'

export default function ProductList({products}) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Products</h2>
    <div className={styles.products_wrapper}>
      {products.map(product => (
        <div key={product.title} className={styles.product}>
          <Link href={`/products/${product.slug}`}>
            <a className={styles.product_item}>
            <div className={styles.product_img}>
              <img src={fromImgToUrl(product.image)}/>
            </div>
            <div className={styles.product_title}>
              {product.title}
            </div>
            <div className={styles.product_price}>
              <b>${formatPrice(product.price)}</b>
            </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
    </div>
  )
}

