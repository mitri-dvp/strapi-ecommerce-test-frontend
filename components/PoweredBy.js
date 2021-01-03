import styles from '../styles/PoweredBy.module.css'

export default function PoweredBy() {
  return (
    <>
      <a href="#" className={styles.powered_by}>
        <p>powered by</p>
        <img src="/mitri-logo.png" alt="mitri.dvp" srcset=""/>
        <p>mitri.dvp</p>
      </a>
    </>
  )
}
