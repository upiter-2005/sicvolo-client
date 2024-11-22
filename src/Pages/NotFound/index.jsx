import React from 'react'
import styles from "./NotFound.module.scss"
import {Link} from "react-router-dom"

export default function NotFound() {
  return (
    <div className={styles.NotFound}>
      <div className={styles.NotFoundWrapper}>
        <div className={styles.left}>
          <p>Oops, We can seem to find
            the page what you are looking for.</p>
            <span>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</span>
            <Link to="/" className={styles.homeBtn}>Home page</Link>
        </div>
        <div className={styles.right}>
          <img src="/img/404.jpg" alt="" />
          <p className={styles.class_404}>404</p>
        </div>
      </div>
    </div>
  )
}
