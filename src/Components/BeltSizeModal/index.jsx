import {useEffect} from 'react'
import styles from "./BeltSizeModal.module.scss"

export default function BeltSizeModal ({active, closeModal}) {

  useEffect(() => {
    if(active){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "scroll";
    }
   
    // document.body.style.overflow = "hidden";
    // return () => {
    //     document.body.style.overflow = "scroll"
    // };
}, [active]);

  return (
    <div className={ active ? `${styles.modal}  ${styles.active}` :`${styles.modal}` } onClick={closeModal}>
      <div className={styles.modal__content} onClick={(e)=> e.stopPropagation()}>
        <h2>Size guide</h2>
        <img src="/img/closeModal.svg" className={styles.closeModal} onClick={closeModal} 
        alt="Sicvolo - close icon"
        title="Sicvolo - close icon"  
         />
     

     <img src="/img/belt_sizes.jpg" 
     alt="Belt sizes icon"
     title="Belt sizes icon"  
      style={{"width": "100%"}} />
        <div className={styles.titles}>
          <span>Sicvolo size</span>
          <span>Cm</span>
          <span>Inches</span>
        </div>
        <div className={styles.sizesWrapper}>

          <div className={styles.sizesRow}>
            <span>65</span>
            <span>65 cm</span>
            <span>25.6"</span>
          </div>
          <div className={styles.sizesRow}>
            <span>70</span>
            <span>70 cm</span>
            <span>27.5"</span>
          </div>
          <div className={styles.sizesRow}>
            <span>75</span>
            <span>75 cm</span>
            <span>29.5"</span>
          </div>
          <div className={styles.sizesRow}>
            <span>80</span>
            <span>80 cm</span>
            <span>31.5"</span>
          </div>
          <div className={styles.sizesRow}>
            <span>85</span>
            <span>85 cm</span>
            <span>33.5"</span>
          </div>
          <div className={styles.sizesRow}>
            <span>90</span>
            <span>90 cm</span>
            <span>35.4"</span>
          </div>
          <div className={styles.sizesRow}>
            <span>95</span>
            <span>95 cm</span>
            <span>37.4"</span>
          </div>
          <div className={styles.sizesRow}>
            <span>100</span>
            <span>100 cm</span>
            <span>39.4"</span>
          </div>
          <div className={styles.sizesRow}>
            <span>105</span>
            <span>105 cm</span>
            <span>41.3"</span>
          </div>
          <div className={styles.sizesRow}>
            <span>110</span>
            <span>110 cm</span>
            <span>43.3"</span>
          </div>
          <div className={styles.sizesRow}>
            <span>115</span>
            <span>115 cm</span>
            <span>45.3"</span>
          </div>
          {/* <div className={styles.sizesRow}>
            <span>3</span>
            <span>14.1 / 44.2</span>
            <span>14.1 / 44.2</span>
          </div>
          <div className={styles.sizesRow}>
            <span>3 1/2</span>
            <span>14.5 / 45.5</span>
            <span>14.5 / 45.5</span>
          </div>
          <div className={styles.sizesRow}>
            <span>4</span>
            <span>14.9 / 46.8</span>
            <span>14.9 / 46.8</span>
          </div>
          <div className={styles.sizesRow}>
            <span>4 1/2</span>
            <span>15.3 / 48.0</span>
            <span>15.3 / 48.0</span>
          </div>
          <div className={styles.sizesRow}>
            <span>5</span>
            <span>15.7 / 49.3</span>
            <span>15.7 / 49.3</span>
          </div>
          <div className={styles.sizesRow}>
            <span>5 1/2</span>
            <span>16.1 / 50.6</span>
            <span>16.1 / 50.6</span>
          </div>
          <div className={styles.sizesRow}>
            <span>5 1/2</span>
            <span>16.1 / 50.6</span>
            <span>16.1 / 50.6</span>
          </div>
          <div className={styles.sizesRow}>
            <span>5 1/2</span>
            <span>16.1 / 50.6</span>
            <span>16.1 / 50.6</span>
          </div>
          <div className={styles.sizesRow}>
            <span>5 1/2</span>
            <span>16.1 / 50.6</span>
            <span>16.1 / 50.6</span>
          </div>
          <div className={styles.sizesRow}>
            <span>5 1/2</span>
            <span>16.1 / 50.6</span>
            <span>16.1 / 50.6</span>
          </div>
          <div className={styles.sizesRow}>
            <span>5 1/2</span>
            <span>16.1 / 50.6</span>
            <span>16.1 / 50.6</span>
          </div> */}
         

        </div>
        
        
      </div>
    </div>
  )
}
