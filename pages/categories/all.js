import Head from 'next/head'
import ProductList from '../../components/ProductList'
import { API_URL, BRAND_NAME } from '../../utils/urls' 
import Header from '../../components/Header'
import viewStyles from '../../styles/View.module.css'


export default function Home({products, categories}) {
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
      <div className={viewStyles.view}>
      <ProductList
          products={products}
          title={'Products'}
          limit={9}
          showPagination={true}
        />
      </div>
    </>
  )
}

// NextJS Fetch and Return Data as Prop
export async function getStaticProps() {
  // Fetch products
  const products_res = await fetch(`${API_URL}/products/`)
  const products = await products_res.json()
  const categories_res = await fetch(`${API_URL}/categories/`)
  const categories = await categories_res.json()

  // Return products as props
  return {
    props: {
      products,
      categories,
    }
  }
}