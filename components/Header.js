import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import AuthContext from '../context/AuthContext'

export default function Header() {

  const router = useRouter()
  const isHome = router.pathname === '/'

  const {user} = useContext(AuthContext)

  const goBack = (e) => {
    e.preventDefault()
    router.back()
  }

  return (
  <div className={styles.nav}>
    
    <div className={isHome ? 'hidden' : styles.back}>
      <a href="#" onClick={goBack}> {'<'} Back</a>
    </div>

    <div className={styles.title}>
      <Link href='/'>
      <a>
        <h1>
          Online Shop
        </h1>
      </a>
      </Link>
    </div>

    <div className={styles.auth}>
      {user ?
      (<div>
        <Link href="/profile">
          <a>{user.email}</a>
        </Link>
      </div>)
      :
      (<div>
        <Link href="/login">
          <a>Log in</a>
        </Link>
      </div>)
      }
    </div>
  </div>
  )
}
