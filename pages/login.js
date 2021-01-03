import styles from '../styles/Login.module.css'
import Head from 'next/head'
import AuthContext from '../context/AuthContext'

import { useContext } from 'react'
import { BRAND_NAME } from '../utils/urls' 


export default function Login() {


  const { GoogleLoginBtn, FacebookLoginBtn } = useContext(AuthContext)

  return (
    <>
      <Head>        
        <meta httpEquiv="Content-Type" content="text/html"/>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/brand-logo.png" />
        <title>Login - {BRAND_NAME}</title>
        <meta name="description" content={`Login into ${BRAND_NAME} for free.`} />
      </Head>

      <h2 className={styles.title}>Log in</h2>

      <div className={styles.login_providers}>
        <GoogleLoginBtn/> 
        <FacebookLoginBtn/> 
      </div>

    </>
  )
}
