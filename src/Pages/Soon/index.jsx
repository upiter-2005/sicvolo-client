import React from 'react'
import styles from "./Soon.module.scss"

export default function Soon() {
  return (
    <div className={styles.soon}>
        <div className={styles.logo}>
            <img src="/img/logo.svg" alt="" />
        </div>

        <p>Currently, our website is undergoing essential maintenance to enhance service quality. We apologize for any inconvenience this may cause. </p>

        <p className={styles.bold}>The website is expected to be fully accessible by 5 Feb 2024.</p>

        <a href="https://www.instagram.com/sicvolo.brand" target="blank">Visit our Instagram <img src="img/rightAr.svg" alt="" /></a>
    </div>
  )
}
