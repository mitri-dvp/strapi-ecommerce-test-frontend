import Head from 'next/head'
import { API_URL, BRAND_NAME } from '../utils/urls' 
import Header from '../components/Header'
import Form from '../components/Form'
import viewStyles from '../styles/View.module.css'
import styles from '../styles/About.module.css'
import { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'


export default function Home({categories}) {
  const { user } = useContext(AuthContext)

  useEffect(() => {
      // console.log(user)
  }, [user])

  return (
    <>
      <Head>
        <title>About | {BRAND_NAME}</title>
        <link rel="icon" href="/brand-logo.png" />
        <meta httpEquiv="Content-Type" content="text/html"/>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content={`Welcome to the ${BRAND_NAME} contact page, feel free to message us.`} />
      </Head>
      <Header categories={categories}/>
      <div className={viewStyles.view}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Contact us</h2>
          <p>Send us a message, we will answer your questions as soon as possible or help you with returns. Please fill out the form below if you need assistance.</p>
          {user ?
            <Form data={{email: user.email}}/>
            :
            <Form data={{}}/>
          }
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