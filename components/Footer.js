import styles from '../styles/Footer.module.css'
import { BRAND_NAME } from '../utils/urls'

export default function Footer() {
  return (
  <footer className={styles.footer}>
    <p>
      {BRAND_NAME}<span>©</span>{new Date().getFullYear()}
    </p>
  </footer>
  )
}
