import { useContext } from 'react'
import { useRouter } from 'next/router'
import { formatPrice } from '../../utils/format'
import { fromImgToUrl, API_URL, BRAND_NAME } from '../../utils/urls'

import Head from 'next/head'
import styles from '../../styles/Product.module.css'
import viewStyles from '../../styles/View.module.css'
import Header from '../../components/Header'

import CartContext from '../../context/CartContext'

const Product = ({ product, categories }) => {
  const { addToProducts, isInsideCart } = useContext(CartContext);

  function zoomIn(e) {
    const imgWrapper = document.getElementById('product-img-wrapper')
    const img = imgWrapper.children[0]
    let clientX = e.clientX - imgWrapper.offsetLeft
    let clientY = e.clientY - imgWrapper.offsetTop

    let mWidht = imgWrapper.offsetWidth
    let mHeigh = imgWrapper.offsetHeight

    clientX= ((clientX / mWidht * 100) - 50)*-1
    clientY= ((clientY / mHeigh * 100) - 50)*-1

    img.style.transform = `translate(${clientX}%, ${clientY}%) scale(2)`
  }

  function onMouseOut() {
    const imgWrapper = document.getElementById('product-img-wrapper')
    const img = imgWrapper.children[0]
    img.style.transform = `translate(-${0}%, -${0}%) scale(1)`
  }

  function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
  }
  
  const onMouseMove = throttled(10, zoomIn);

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html"/>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/brand-logo.png" />
        <title>{`${product.title} | ${BRAND_NAME}`}</title>
        {product.meta_description &&
          <meta name="description" content={product.meta_description} />
        }
      </Head>
      <Header categories={categories}/>
      <div className={viewStyles.view}>
        <div className={styles.wrapper}>
        <div>
          <div id={'product-img-wrapper'} onMouseMove={onMouseMove} onMouseOut={onMouseOut} className={styles.product_img_wrapper}>
            <img src={fromImgToUrl(product.image)}/>
          </div>
        </div>
        <div>
          <h3 className={styles.product_title}>{product.title}</h3>
          <p className={styles.product_price}><b>${formatPrice(product.price)}</b></p>
          <p className={styles.product_description}>
            {product.description}
          </p>

          <button className={styles.button} onClick={() => {addToProducts(product)}}>
            {isInsideCart(product) ? 'Open Cart' : 'Add To Cart'}
          </button>

        </div>

      </div>
      </div>
    </>
  )
}

export async function getStaticProps({params: {slug}}) {
    // Retrieve all possible paths
    const product_res = await fetch(`${API_URL}/products/?slug=${slug}`)
    const found = await product_res.json()
    const categories_res = await fetch(`${API_URL}/categories/`)
    const categories = await categories_res.json()
  
    // Return to NextJS context
    return  {
      props: {
        product: found[0], // Using a query will result in returning an array
        categories,
      }
    }
}

export async function getStaticPaths() {
  // Retrieve all possible paths
  const products_res = await fetch(`${API_URL}/products/`)
  const products = await products_res.json()

  // Return as Props
  return {
    paths: products.map(product => ({
      params: {
        slug: String(product.slug)
      }
    })),
    fallback: false // 404 error if no match
  }
}

export default Product