import {useEffect, useState} from "react";
import styles from "./ProductCard.module.scss";
import {Link} from "react-router-dom"
import { useTranslation  } from 'react-i18next';

export default function  ProductCard({ isCentered, name, img, price, link, id, meta }) {
  const { t, i18n } = useTranslation();
  const[cartName, setCartName] = useState('');

  useEffect(()=>{
    let prefixName = "";
    if(localStorage.getItem("lng")){
      if(localStorage.getItem("lng") === "ua"){
        prefixName = "name_uk";
      }else{
        prefixName = "name_" + localStorage.getItem("lng")
      }
      
    }else{
      prefixName = "en";
      localStorage.setItem("lng", "en")
    }
    //let prefixName = "name_" + localStorage.getItem("lng") || "en";
    let langName = meta?.find(obj => obj.key === prefixName);
    setCartName(langName?.value);
  })
  return (
    <div
      className={
        isCentered ? `${styles.isCentered} ${styles.ProductCard}` : `${styles.ProductCard}`
      }>
      <Link to={
          (localStorage.getItem("lng") === 'en')
          ? `/product/${link}`
           :
           `/${localStorage.getItem("lng")}/product/${link}`
         }><img src={img} alt="" /></Link>  
      <p className={styles.ProductCard_title}>{cartName} </p>
      {/* <div className={styles.ProductCard_price}>$ {price}</div> */}
      <Link to={
          (localStorage.getItem("lng") === 'en')
          ? `/product/${link}`
           :
           `/${localStorage.getItem("lng")}/product/${link}`
         }
       className={styles.ProductCard_link}>
        {t("Details")}
      </Link>
    </div>
  );
}
