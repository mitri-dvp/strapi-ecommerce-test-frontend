import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
  <footer className={styles.footer}>
    <img className={styles.logo} src="/mitri-logo.png" alt=""/>
    <p>mitri.dvp © 2020</p>
  </footer>
  )
}
