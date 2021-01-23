import {useEffect, useState} from 'react'
import { fromImgToUrl } from '../utils/urls' 
import { formatPrice } from '../utils/format'

import styles from '../styles/ProductList.module.css'
import Link from 'next/link'
import PagesControls from './PagesControls'


export default function ProductList(props) {

  const {products, title, showPagination} = props

  const [limit, setLimit] = useState(props.limit)
  const [pages, setPages] = useState(1)
  const [current, setCurrent] = useState(1)
  const [items, setItems] = useState([])

  const changePage = (n) => {
    if(n < 1) return
    if(n > pages) return
    setCurrent(n)
  }

  useEffect(() => {
    const a = products.length % limit ? Math.floor(products.length / limit) + 1 : products.length / limit
    setPages(a)

    let temp = []
    for (let i = (current-1) * limit; i < ((current-1) * limit)+limit; i++) {
      const product = products[i]
      if(!product) break
      temp.push(
        <div key={product.id} className={styles.product}>
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
      ) 
    }
    setItems(temp)
  }, [products, current, limit])

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
    <div className={styles.products_wrapper}>
      {items}
    </div>
    {showPagination || (limit < products.length) &&
    <div className={styles.pages_controls}>
      <div>
        <PagesControls props={{current, pages, changePage}}/>
      </div>
    </div>
    }
    </div>
  )
}

