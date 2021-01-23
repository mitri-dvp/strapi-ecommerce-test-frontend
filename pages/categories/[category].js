import {useEffect, useState} from 'react'
import { formatPrice } from '../../utils/format'
import { fromImgToUrl, API_URL, BRAND_NAME } from '../../utils/urls'

import Header from '../../components/Header'
import viewStyles from '../../styles/View.module.css'
import Head from 'next/head'
import styles from '../../styles/ProductList.module.css'
import Link from 'next/link'
import PagesControls from '../../components/PagesControls'


const Category = ({ products, category_name, categories }) => {

  const [limit, setLimit] = useState(9)
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
      ) 
    }
    setItems(temp)
  }, [products, current, limit])

  return (
    <>
      <Head>
        <link rel="icon" href="/brand-logo.png" />
        <title>{category_name} | {BRAND_NAME}</title>
        <meta name="description" content={`${BRAND_NAME} ${category_name} options! Choose them right here.`}/>
      </Head>
      <Header categories={categories}/>
        
      <div className={viewStyles.view}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>{category_name}</h2>
        <div className={styles.products_wrapper}>
          {items}
        </div>
        {(limit < products.length) &&
        <div className={styles.pages_controls}>
          <div>
            <PagesControls props={{current, pages, changePage}}/>
          </div>
        </div>
        }
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({params: {category}}) {
    // Retrieve all possible paths
    const product_res = await fetch(`${API_URL}/products?categories.name=${category}`)
    const found = await product_res.json()
    const categories_res = await fetch(`${API_URL}/categories/`)
    const categories = await categories_res.json()
  
    // Return to NextJS context
    return  {
      props: {
        products: found, // Using a query will result in returning an array
        category_name: category,
        categories: categories,
      }
    }
}

export async function getStaticPaths() {
  // Retrieve all possible paths
  const categories_res = await fetch(`${API_URL}/categories/`)
  const categories = await categories_res.json()

  // Return as Props
  return {
    paths: categories.map(category => ({
      params: {
        category: String(category.name)
      }
    })),
    fallback: false // 404 error if no match
  }
}

export default Category