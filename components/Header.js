import styles from '../styles/Header.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { API_URL } from '../utils/urls'


import AuthContext from '../context/AuthContext'
import CartButton from './CartButton'

export default function Header({categories}) {

  const router = useRouter()
  const isHome = router.pathname === '/'
  const isCheckout = router.pathname === '/checkout'

  const [showCategories, setShowCategories] = useState(false)
  const [showMobileCategories, setShowMobileCategories] = useState(false)
  const [openMobileNav, setOpenMobileNav] = useState(false)

  const {user} = useContext(AuthContext)

  const goBack = (e) => {
    e.preventDefault()
    router.back()
  }

  return (
  <div className={styles.header}>
    
    <nav className={styles.mobile_nav}>
      <div className={styles.burger} onClick={() => {setOpenMobileNav(true)}}>
        <img src="/list.svg" alt=""/>
      </div>

      <div className={`${styles.mobile_nav_overlay} ${openMobileNav && styles.show}`}>
        <div className={`${styles.mobile_nav_body} ${openMobileNav && styles.show}`}>
        <span className={styles.mobile_nav_close}>
              <img src="/x.svg" onClick={() => {setOpenMobileNav(false)}}/>
        </span>
        <ol>
          <Link href={'/'}>
            <a>Home</a>
          </Link>
        </ol>
        <ol className={styles.mobiele_nav_categories_link} onClick={() => setShowMobileCategories(!showMobileCategories)}>
            <a>
              Categories
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>
            </a>
          <div className={`${styles.categories_dropdown_nav} ${showMobileCategories && styles.show}`}>
            <ol>
              <Link href={`/categories/all`}>
                <a>All</a>
              </Link>
            </ol>
          {categories.map(category => {
            return (
            <ol key={category.slug}>
              <Link href={`/categories/${category.slug}`}>
                <a>{category.name}</a>
              </Link>
            </ol>
            )
          })}
          </div>
        </ol>
        <ol>
          <Link href={'/about'}>
            <a>About</a>
          </Link>
        </ol>
        <ol>
          <Link href={'/contact'}>
            <a>Contact</a>
          </Link>
        </ol>

        </div>
      </div>

    </nav>
    
    <div className={styles.title}>
      <Link href='/'>
      <a>
        {/* <img src="/brand-logo.png" alt=""/> DEV */}
        <img src="https://res.cloudinary.com/dz5vyxfew/image/upload/v1611380093/brand-logo_v0bpfk.png" alt=""/>
        <h1>
          Online Shop
        </h1>
      </a>
      </Link>
    </div>

    <nav className={styles.nav}>
      <ol>
        <Link href={'/'}>
          <a>Home</a>
        </Link>
      </ol>
      <ol className={styles.categories_link} onMouseEnter={() => setShowCategories(true)} onMouseLeave={() => setShowCategories(false)}>
          <a>
            Categories
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </a>
        <div className={`${styles.categories_dropdown} ${showCategories && styles.show}`}>
        <ol>
          <Link href={`/categories/all`}>
            <a>All</a>
          </Link>
        </ol>
        {categories.map(category => {
          return (
          <ol key={category.slug}>
            <Link href={`/categories/${category.slug}`}>
              <a>{category.name}</a>
            </Link>
          </ol>
          )
        })}
        </div>
      </ol>
      <ol>
        <Link href={'/about'}>
          <a>About</a>
        </Link>
      </ol>
      <ol>
        <Link href={'/contact'}>
          <a>Contact</a>
        </Link>
      </ol>

    </nav>
    
    {/* <div className={isHome ? 'hidden' : styles.back}>
      <a href="#" onClick={goBack}>
        <img src="/arrow-left-circle.svg" alt=""/>
        <span>Back</span>
      </a>
    </div> */}


    <div className={styles.user_controls}>
      <CartButton disabled={isCheckout}/>

      <div className={styles.auth}>
        {user ?
        (
          <Link href="/profile">
            <a> <img src="/person-circle.svg" alt=""/> </a>
          </Link>
        )
        :
        (
          <Link href="/login">
            <a>Log in</a>
          </Link>
        )
        }
      </div>
    </div>
  </div>
  )
}

export async function getInitialProps() {
  // Retrieve all possible paths
  const categories_res = await fetch(`${API_URL}/categories/`)
  const categories = await categories_res.json()

  // Return to NextJS context
  return  {
    props: {
      categories: categories // Using a query will result in returning an array
    }
  }
}
