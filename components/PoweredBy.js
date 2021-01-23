import styles from '../styles/PoweredBy.module.css'

export default function PoweredBy() {
  return (
    <>
      <a href="#" className={styles.powered_by}>
        <p>powered by</p>
        {/* <img src="/mitri-logo.png" alt="mitri.dvp"/> DEV */}
        <img src="https://res.cloudinary.com/dz5vyxfew/image/upload/v1611380093/mitri-logo_vctatz.png" alt="mitri.dvp"/>
        <p>mitri.dvp</p>
      </a>
    </>
  )
}
