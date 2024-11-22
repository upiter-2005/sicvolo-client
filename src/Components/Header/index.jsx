import {useState, useEffect} from "react";
import NavMain from "../NavMain";
import styles from "./Header.module.scss";
import Search from "../../Components/Search";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useSelector} from "react-redux";
import {showCard} from "../../redux/slices/cardSlice"
import { setmobMnu,setSearchMob, setFrontMnu, lngSwitcher, setCurrency} from "../../redux/slices/userSlice"
import {useDispatch } from "react-redux";
import Select from 'react-select'
import axios from "axios"

import { useTranslation  } from 'react-i18next';


export default function Header() {
  const { t, i18n } = useTranslation();
  const [url, setUrl] = useState('');
  const [currentLang, setCurrentLang] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [detectedCurrency, setDetectedCurrency] = useState('USD');
  const user = useSelector(state=>state.user.user);
  const frontMnu = useSelector(state=>state.user.frontMnu);
  const items = useSelector(state=>state.card.items);
  const wasRegistered = useSelector(state=>state.card.wasRegistered);

  

  useEffect(()=>{
    setUserName(user?.user_nicename);
  }, [user]);
 

  const cartOpen = () => {
    dispatch(showCard(true))
  }

  const mnuHandler = (e) => {
    e.preventDefault()
    dispatch(setmobMnu(true));
  }
  const getGeoInfo = () => {
    
    if(localStorage.getItem('lng')){
      return;
    }else{
      axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let clientLng = response.data;
        
        console.log(clientLng.country);
        let path = location.pathname;
             if (path.includes('/sp') ){localStorage.setItem("lng", "sp")}
        else if (path.includes('/fr') ){localStorage.setItem("lng", "fr")}
        else if (path.includes('/it') ){localStorage.setItem("lng", "it")}
        else if (path.includes('/ua') ){localStorage.setItem("lng", "ua")}
        else if (path.includes('/ru') ){localStorage.setItem("lng", "ru")}
        else{localStorage.setItem("lng", "en"); }
        if(
          clientLng.country.toLowerCase() === 'en' ||
          clientLng.country.toLowerCase() === 'sp' ||
          clientLng.country.toLowerCase() === 'fr' ||
          clientLng.country.toLowerCase() === 'it' ||
          clientLng.country.toLowerCase() === 'ua' ||
          clientLng.country.toLowerCase() === 'ru' 
          ){
            redirect(clientLng.country.toLowerCase())
            i18n.changeLanguage(clientLng.country.toLowerCase());
            // localStorage.setItem("lng", e.value);
            dispatch(lngSwitcher(clientLng.country.toLowerCase()));
          }else{
            redirect('en')
            i18n.changeLanguage(clientLng.country.toLowerCase());
            // localStorage.setItem("lng", e.value);
            dispatch(lngSwitcher(clientLng.country.toLowerCase()));
          }
        


      })
      .catch((error) => {
        console.log(error);
      });
    }
  };




  const redirect = (newLang) => {
    if(localStorage.getItem("lng") === newLang){return;}

    
     const to = '/'+newLang;
      let path = location.pathname;
      console.log(path);

   if (localStorage.getItem("lng") === "en"){
      if (newLang === 'sp'){path = to +  path;}
      if (newLang === 'fr'){path = to +  path;}
      if (newLang === 'it'){path = to +  path;}
      if (newLang === 'ua'){path = to +  path;}
      if (newLang === 'ru'){path = to +  path;}
      if (newLang === 'en'){return;}
   }
   else if (newLang === "en" && localStorage.getItem("lng") !== "en"){
    if (localStorage.getItem("lng") === 'sp'){path = path.replace('/sp', '' );}
    if (localStorage.getItem("lng") === 'fr'){path = path.replace('/fr', '' );}
    if (localStorage.getItem("lng") === 'it'){path = path.replace('/it', '' );}
    if (localStorage.getItem("lng") === 'ua'){path = path.replace('/ua', '' );}
    if (localStorage.getItem("lng") === 'ru'){path = path.replace('/ru', '' );}
   }
   else{
      if (localStorage.getItem("lng") === 'sp'){path = path.replace('/sp', to );}
      if (localStorage.getItem("lng") === 'fr'){path = path.replace('/fr', to );}
      if (localStorage.getItem("lng") === 'it'){path = path.replace('/it', to );}
      if (localStorage.getItem("lng") === 'ua'){path = path.replace('/ua', to );}
      if (localStorage.getItem("lng") === 'ru'){path = path.replace('/ru', to );}
   }
  
   localStorage.setItem("lng", newLang);
    console.log(path);    
    navigate(path)
    window.location.reload();
// localStorage.setItem("lng", url);

   // window.location.replace(path) ;
  }


  const detectCurrencyWithIp = () => {
    console.log('detectCurrencyWithIp');
    axios
    .get("https://ipapi.co/json/")
    //.then((res) => console.log(res.data))
    .then((res) => {
      if(localStorage.getItem('currency')){ return false;}

      if(res?.data.country_name === "Ukraine"){
        console.log("UKR");
        localStorage.setItem("currency", "UAH");   
        dispatch(setCurrency('UAH'));
        setDetectedCurrency('UAH');
        return false;
      }
      
     else  if(res?.data.continent_code === "EU"){
        localStorage.setItem("currency", "EUR");   
        dispatch(setCurrency('EUR'));
        setDetectedCurrency('EUR')
      }else{
        localStorage.setItem("currency", "USD");   
        dispatch(setCurrency('USD'));
        setDetectedCurrency('USD')
      }
    })
  }

  useEffect(()=>{
    detectCurrencyWithIp();
    if(localStorage.getItem("lng")){document.documentElement.setAttribute('lang', localStorage.getItem("lng")); return;}else{getGeoInfo();}
   
  }, [])




  const changeLng = (e) => {
    redirect(e.value);
    console.log(e.value);
    i18n.changeLanguage(e.value);
		// localStorage.setItem("lng", e.value);
    dispatch(lngSwitcher(e.value));
    document.documentElement.setAttribute('lang', e.value);
    //window.location.reload();
  }

  const changeCurrency = (e) => {
    dispatch(setCurrency(e.value))
    console.log(e.value);
  }


  // const changeLng = (e) => {
  
  //   console.log(e.value);
  //   i18n.changeLanguage(e.value);
	// 	localStorage.setItem("lng", e.value);
  //   dispatch(lngSwitcher(e.value));
  //   // window.location.reload();
  // }

console.log(location.pathname);

const optionsLangs = [
  { value: "en", label: "EN"},
  { value: "sp", label: "SP"},
  { value: "fr", label: "FR"},
  { value: "it", label: "IT"},
  { value: "ua", label: "UA"},
  { value: "ru", label: "RU"},
]
const optionsCurrencies = [
  { value: "UAH", label: "UAH"},
  { value: "EUR", label: "EUR"},
  // { value: "GBP", label: "GBP"},
  { value: "USD", label: "USD"},
]


  return (
    <>
  
    <div className="container">
      <div className={styles.header}>
        <div className={styles.header_left}>
          <a href="#" className={styles.mobMnu} alt="menu" onClick={mnuHandler}><img src="/img/bar.svg" 
          alt="Sicvolo - menu icon"
          title="Sicvolo - menu icon"
           /></a>
          
          {window.innerWidth > 992 ? ( <Search />) : (<img src="/img/search.svg" className={styles.mobSearchSwitcher} onClick={()=> dispatch(setSearchMob(true))} 
          alt="Sicvolo - search icon"
          title="Sicvolo - search icon"
          
           />)}
         
        </div>
       
        
        <Link to={
          (localStorage.getItem("lng") === 'en')
           ? "/"
            :
            `/${localStorage.getItem("lng")}`
          } 
          alt="sic volo" className={styles.logo}>
          <img src="/img/logo.svg" 
           alt="Sicvolo - logo icon"
           title="Sicvolo - logo icon"
           />
        </Link >

        <div className={styles.headerLinks}>
          {(userName || localStorage.getItem("userName")) ? (
            <Link to="/account">
            {localStorage.getItem("userName") }
            <img src="/img/user.svg" 
            alt="Sicvolo - user icon"
            title="Sicvolo - user icon"
             />
          </Link>
          ) : (
            <Link to="/login">
            {userName}
            <img src="/img/user.svg"
             alt="Sicvolo - user icon"
             title="Sicvolo - user icon"
              />
          </Link>
          )}
          
          {location.pathname === "/checkout" ? '' : (
            <div href="#" className={styles.cartHeaderWrap} onClick={cartOpen}  id="popupCartBtn">
            <img src="/img/cart.svg" 
            alt="Sicvolo - cart icon"
            title="Sicvolo - cart icon"
             /> <span>{items.length}</span>
          </div>
          ) }
          
          <div className=" currencies">
          <Select 
            options={optionsCurrencies}
            onChange={changeCurrency}
            placeholder={localStorage.getItem("currency") || detectedCurrency}

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



          <div className="langs">
          <Select 
            options={optionsLangs}
            onChange={changeLng}
            placeholder={localStorage.getItem('lng') || currentLang}

            // defaultInputValue={{ label: localStorage.getItem("lng") || 'en', value: localStorage.getItem("lng") || 'en' }}

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
        </div>
      </div>
     
    </div>
    {
    (
      location.pathname !== "/" &&
      location.pathname !== "/sp" &&
      location.pathname !== "/fr" &&
      location.pathname !== "/it" &&
      location.pathname !== "/ru" &&
      location.pathname !== "/ua" 
    )
    ? <NavMain /> : ''}
    
    </>
    
  );
}
