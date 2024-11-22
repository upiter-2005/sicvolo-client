import {useState} from "react";
import styles from "./Footer.module.scss";
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import { useTranslation  } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();
const[subscVal, setSubscVal] = useState();
  const subscribeHandler = (e) => {
    e.preventDefault();
    toast("Your subscribe is succesfull")
    setSubscVal('')
    window.fbq('track', 'CompleteRegistration', {value: subscVal});
  }
  return (
    <footer>
      <div className="container">
        <div className={styles.footerWrap}>
          <div className={styles.footer_col_1}>
            <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/"
           :
           `/${localStorage.getItem("lng")}`
         }>
              <img src="/img/logo.svg" 
              alt="Sicvolo - product img"
              title="Sicvolo - product img"
               />
            </a>
            <div className={styles.follow}>
              <p>{t("Follow us")}</p>
              <a href="https://instagram.com/sicvolo.brand/" target="blank">
                <img src="/img/insta.svg" 
                alt="Sicvolo - Instagram"
                title="Sicvolo - Instagram"
                 />
              </a>
              <a href="https://www.facebook.com/sicvolo.brand/" target="blank">
                <img src="/img/fb.svg" 
                alt="Sicvolo - Facebook"
                title="Sicvolo - Facebook"
                 />
              </a>
              {/* <a href="#">
                <img src="/img/twitter.svg" alt="" />
              </a>
              <a href="#">
                <img src="/img/youtube.svg" alt="" />
              </a> */}
            </div>
          </div>
          <div className={styles.footer_col_2}>
            <div className={styles.footer_column}>
              <p>Sic Volo</p>
              <ul>
                <li>
                  <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/about"
           :
           `/${localStorage.getItem("lng")}/about`
          }>{t("about us")}</a>
                </li>
                <li>
                  <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/contact"
           :
           `/${localStorage.getItem("lng")}/contact`
          }>{t("contact us")}</a>
                </li>
                <li>
                  <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/partnership"
           :
           `/${localStorage.getItem("lng")}/partnership`
          }>{t("Partnership")}</a>
                </li>
                <li>
                  <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/care"
           :
           `/${localStorage.getItem("lng")}/care`
          }>{t("Care")}</a>
                </li>
              </ul>
            </div>
            <div className={styles.footer_column}>
              <p>{t("Categories")}</p>
              <ul>
                <li>
                  <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/rings"
           :
           `/${localStorage.getItem("lng")}/catalog/rings`
          }>{t("jewelry")}</a>
                </li>
                <li>
                  <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/belts"
           :
           `/${localStorage.getItem("lng")}/catalog/belts`
          }>{t("belts")}</a>
                </li>
                <li>
                  <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/accessories"
           :
           `/${localStorage.getItem("lng")}/catalog/accessories`
          }>{t("Accessories")}</a>
                </li>
               


              </ul>
            </div>
            <div className={styles.footer_column}>
              <p>{t("Conditions")}</p>
              <ul>
                <li>
                  <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/terms"
           :
           `/${localStorage.getItem("lng")}/terms`
          }>{t("Terms & Conditions")}</a>
                </li>
                <li>
                  <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/payment"
           :
           `/${localStorage.getItem("lng")}/payment`
          }>{t("Payment & Shipping")}</a>
                </li>
                <li>
                  <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/policy"
           :
           `/${localStorage.getItem("lng")}/policy`
          }>{t("Privacy Policy")}</a>
                </li>
                <li>
                  <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/return"
           :
           `/${localStorage.getItem("lng")}/return`
          }>{t("Return Policy")}</a>
                </li>
                <li>
                  <a href="/offerta">
                  {t("Offerta")}
                    {/* <img src="/img/liqpay.png" alt="" width={60} /> */}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.footer_col_3}>
            <p>{t("Subscribe")}</p>
            <form className={styles.subscribe_block} onSubmit={subscribeHandler}>
              <img src="/img/search.svg" 
              alt="Sicvolo - Search icon"
              title="Sicvolo - Search icon"
               />
              <input type="text" value={subscVal} onChange={e=>setSubscVal(e.target.value)} placeholder={t("Enter your email")} required />
            </form>
            <div className={styles.copy}>Copyright © 2024 Sicvolo. All rights reserved</div>
          </div>
          <div className={styles.copyMob}>Copyright © 2024 Sicvolo. All rights reserved</div>
       
        </div>
       
      </div>
     
    </footer>
  );
}
