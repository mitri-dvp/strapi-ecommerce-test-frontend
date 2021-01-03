import Head from 'next/head'
import ProductList from '../components/ProductList'
import { API_URL, BRAND_NAME } from '../utils/urls' 


export default function Home({products}) {
  return (
    <>
      <Head>
        <title>Home | {BRAND_NAME}</title>
        <link rel="icon" href="/brand-logo.png" />
        <meta httpEquiv="Content-Type" content="text/html"/>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content={`Welcome to ${BRAND_NAME}.`} />
      </Head>
      <ProductList products={products}/>
    </>
  )
}

// NextJS Fetch and Return Data as Prop
export async function getStaticProps() {
  // Fetch products
  const products_res = await fetch(`${API_URL}/products/`)
  const products = await products_res.json()

  // Return products as props
  return {
    props: {
      products
    }
  }
}


