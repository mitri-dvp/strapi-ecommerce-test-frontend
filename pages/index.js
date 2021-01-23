import Head from 'next/head'
import ProductList from '../components/ProductList'
import { API_URL, BRAND_NAME } from '../utils/urls' 
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import viewStyles from '../styles/View.module.css'
import {useState, useEffect} from 'react'


export default function Home({products, categories, featured_products, new_products}) {

  const [images_link, setImages] = useState(['/hero-test-5.webp', '/hero-test-4.webp'])
  const [windowWidth, setWindowWidth] = useState(0)
  // const [images_link, setImages] = useState(['/hero-test-5.webp', '/hero-test-4.webp', '/hero-test-3.webp'])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  return (
    <>
      <Head>
        <title>Home | {BRAND_NAME}</title>
        <link rel="icon" href="/brand-logo.png" />
        <meta httpEquiv="Content-Type" content="text/html"/>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content={`Welcome to ${BRAND_NAME} ecommerce website.`} />
      </Head>
      <Header categories={categories}/>
        <ImageSlider images_link={images_link}/>
      <div className={viewStyles.view}>
        <ProductList
          products={featured_products}
          title={'Featured'}
          limit={3}
          showPagination={false}
        />
        <ProductList
          products={new_products}
          title={'New'}
          limit={3}
          showPagination={false}
        />
      </div>
    </>
  )
}

// NextJS Fetch and Return Data as Prop
export async function getStaticProps() {
  // Fetch products
  const products_res = await fetch(`${API_URL}/products?_sort=created_at:DESC`)
  const products = await products_res.json()
  const categories_res = await fetch(`${API_URL}/categories/`)
  const categories = await categories_res.json()

  const featured_products = products.filter(product => product.featured)
  const new_products = [products[0], products[1], products[2]]

  // Return products as props
  return {
    props: {
      products,
      featured_products,
      new_products,
      categories,
    }
  }
}