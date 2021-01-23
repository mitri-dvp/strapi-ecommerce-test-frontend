import { useEffect, useContext, useState } from 'react'
import { API_URL, BRAND_NAME } from '../../../utils/urls'

import Header from '../../../components/Header'
import viewStyles from '../../../styles/View.module.css'
import Head from 'next/head'

import AuthContext from '../../../context/AuthContext'

export default function Google({categories}) {
  
  const [error, setError] = useState(false)
  
  const { login } = useContext(AuthContext)

  useEffect(async () => {
    const res = await fetch(`${API_URL}/auth/google/callback?${location.search}`)
    const data = await res.json()
    
    if(data.error) {
      setError(true)
      return
    }

    sessionStorage.setItem('jwt', data.jwt)
    login(data.user.email)
  }, [])


  return (
    <>
    <Head>
      <link rel="icon" href="/brand-logo.png" />
      <title>Google - {BRAND_NAME}</title>
      <meta name="description" content={`Access ${BRAND_NAME} with your Google account.`}/>
    </Head>

    <Header categories={categories}/>
      
    <div className={viewStyles.view}>
      {error ? 
        <div>
          <p>An error has ocurred.</p>
        </div>
      :
        <div className='spinner'></div>
      }
    </div>
  </>
  )
}

export async function getStaticProps() {
  // Retrieve all possible paths
  const categories_res = await fetch(`${API_URL}/categories/`)
  const categories = await categories_res.json()

  // Return to NextJS context
  return  {
    props: {
      categories: categories
    }
  }
}
