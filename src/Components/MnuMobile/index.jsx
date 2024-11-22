import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import styles from "./SearchMobile.module.scss";
import { setmobMnu, setCurrency} from "../../redux/slices/userSlice"
import {useDispatch, useSelector} from "react-redux";
import { useTranslation  } from 'react-i18next';
import Select from 'react-select'

export default function SearchMobile() {
  const { t, i18n } = useTranslation();
  const mobMnu = useSelector(state=>state.user.mobMnu);
  const dispatch = useDispatch();


  const changeCurrency = (e) => {
    dispatch(setCurrency(e.value))
    console.log(e.value);
  }

  const optionsCurrencies = [
    { value: "UAH", label: "UAH"},
    { value: "EUR", label: "EUR"},
    { value: "GBP", label: "GBP"},
    { value: "USD", label: "USD"},
  ]

  return (
    <nav className={mobMnu ? `${styles.MnuMobile} ${styles.activeMobMnu}` : ''}>
      <img src="/img/close-cart.svg" className={styles.close} 
      alt="Sicvolo - close cart icon"
      title="Sicvolo - close cart icon"
       onClick={()=> dispatch(setmobMnu(false))} />
      <ul>
        <Link to="/" alt="sic volo" className={styles.logo} onClick={()=> dispatch(setmobMnu(false))}>
          <img src="/img/logo.svg" 
          alt="Sicvolo - logo icon"
          title="Sicvolo - logo icon"
           />
        </Link >
        <li>
        <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/about"
           :
           `/${localStorage.getItem("lng")}/about`
         }   className={styles.navLink}>
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
         } className={styles.navLink}>
        {t("faq")}
        </a>
      </li>
      </ul>
      <div className=" currenciesMobile">
          <Select 
            options={optionsCurrencies}
            onChange={changeCurrency}
            placeholder={'USD'}

            className="lng-select"
          
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  boxShadow: 'none',
                }),
                menu: (provided, state) => ({
                    ...provided,
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#131313"
                  }),
                option: (provided, state) => ({
                    ...provided,
                    color: "#fff",
                    fontSize: 16,
                    backgroundColor: state.isFocused ? "#333" : "#1a1a1a",
                    cursor: "pointer",
                    borderColor: "#333",
                    outline: "none",
                    border: "none"

              })
              }}
            classNamePrefix="react-select" />
            
          </div>
    </nav>
  );
}
