import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import styles from "./NavMain.module.scss";
import { showCard} from "../../redux/slices/cardSlice"
import {useDispatch} from "react-redux";
import { useTranslation  } from 'react-i18next';

export default function NavMain() {
  const { t, i18n } = useTranslation();



  return (
    <nav className={styles.mainNav}>
     <ul>
      <li>
        <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/about"
           :
           `/${localStorage.getItem("lng")}/about`
         } 
         
        className={styles.navLink}>
        {t("about us")}
        </a>
      </li>
      <li>
        <a href={
          
            (localStorage.getItem("lng") === 'en')
            ? "/catalog/belts"
             :
             `/${localStorage.getItem("lng")}/catalog/belts`
           } 
          className={styles.navLink}>
        {t("belts")}
        </a>
      </li>
      <li>
      <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/rings"
           :
           `/${localStorage.getItem("lng")}/catalog/rings`
         } 
        className={styles.navLink}>
      {t("jewelry")}
          </a>
      </li>
      <li>
      <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/accessories"
           :
           `/${localStorage.getItem("lng")}/catalog/accessories`
         }
         className={styles.navLink}>
      {t("accessories")}
          </a>
      </li>
      <li>
        <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/contact"
           :
           `/${localStorage.getItem("lng")}/contact`
         }
          className={styles.navLink}>
        {t("contact us")}
        </a>
      </li>
      <li>
        <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/faq"
           :
           `/${localStorage.getItem("lng")}/faq`
         }
         className={styles.navLink}>
        {t("faq")}
        </a> 
      </li>
    </ul>
    </nav>
  );
}
