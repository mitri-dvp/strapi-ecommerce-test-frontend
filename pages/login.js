import Head from 'next/head'
import AuthContext from '../context/AuthContext'
import styles from '../styles/Login.module.css'
import Header from '../components/Header'
import viewStyles from '../styles/View.module.css'

import { API_URL, BRAND_NAME } from '../utils/urls' 
import { useContext } from 'react'


export default function Login({categories}) {

  const { GoogleLoginBtn, FacebookLoginBtn } = useContext(AuthContext)

  return (
    <>
      <Head>        
        <meta httpEquiv="Content-Type" content="text/html"/>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/brand-logo.png" />
        <title>Login | {BRAND_NAME}</title>
        <meta name="description" content={`Login into ${BRAND_NAME} for free.`} />
      </Head>
      <Header categories={categories}/>
      <div className={viewStyles.view}>
        <h2 className={styles.title}>Log in</h2>

        <div className={styles.login_providers}>
          <GoogleLoginBtn/> 
          <FacebookLoginBtn/> 
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
      categories
    }
  }
}