import Head from 'next/head'
import { API_URL, BRAND_NAME } from '../utils/urls' 
import Header from '../components/Header'
import viewStyles from '../styles/View.module.css'
import styles from '../styles/About.module.css'


export default function Home({categories}) {
  return (
    <>
      <Head>
        <title>About | {BRAND_NAME}</title>
        <link rel="icon" href="/brand-logo.png" />
        <meta httpEquiv="Content-Type" content="text/html"/>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content={`Welcome to the ${BRAND_NAME} about page, find out more about us.`} />
      </Head>
      <Header categories={categories}/>
      <div className={viewStyles.view}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>About us</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aperiam consequuntur quisquam odit fugiat corrupti doloribus. Laboriosam officiis aliquam magnam! Omnis, inventore. Architecto natus quasi beatae, id voluptate delectus numquam.</p>
          <div className={styles.image_wrapper}>
            <img src="/hero-test-3.webp" alt=""/>
          </div>
        </div>
      </div>
    </>
  )
}

// NextJS Fetch and Return Data as Prop
export async function getStaticProps() {
  // Fetch products
  const categories_res = await fetch(`${API_URL}/categories/`)
  const categories = await categories_res.json()


  // Return products as props
  return {
    props: {
      categories,
    }
  }
}