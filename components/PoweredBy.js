import styles from '../styles/PoweredBy.module.css'

export default function PoweredBy() {
  return (
    <>
      <a href="https://www.mitri-dvp.com/" className={styles.powered_by}>
        <img src="https://res.cloudinary.com/dz5vyxfew/image/upload/v1611380093/mitri-logo_vctatz.png" alt="mitri.dvp"/>
        <p>mitri.dvp</p>
      </a>
    </>
  )
}
