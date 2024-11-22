import React from 'react'
import styles from "./OrderItem.module.scss"

export default function OrderItem({img, name, price, qty, size, sku, url}) {
  return (
    <div className={styles.orderItem}>
      <img src={img} className={styles.img} 
      alt="Sicvolo - product order img"
      title="Sicvolo - product order img"
       />
      <div className={styles.center}>
        <a href={url} target="blank" className={styles.title}>{name} </a>
        <div className={styles.sku}>{sku}</div>
        <div className={styles.bottom}>
            {size > 0 ? (<div className={styles.item}>
                <span>Size</span>
                <span>{size}</span>
            </div>): ''}
            
            {/* <div className={styles.item}>
                <span>Colour</span>
                <span>white</span>
            </div> */}
            <div className={styles.item}>
                <span>Qty</span>
                <span>{qty}</span>
            </div>
        </div>

      </div>
      <div className={styles.price}>
        {price} $
      </div>
    </div>
  )
}
