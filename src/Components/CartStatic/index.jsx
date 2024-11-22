import {useEffect, useState, useRef} from 'react'
import styles from "./CartStatic.module.scss"
import CartItem from "../CartItem"
import Convert from "../Convert"
import { useSelector, useDispatch } from "react-redux";
import {setPromoSale} from "../../redux/slices/cardSlice"
import {setPromoName} from "../../redux/slices/userSlice"
import {useNavigate} from "react-router-dom"
import {promocodes} from "../../utils/promocodes"
import { useTranslation  } from 'react-i18next';

export default function CartStatic({popup}) {
  const { t, i18n } = useTranslation();
  console.log(promocodes);

  const [disable, setDisable] = useState(false)
  const [promo, setPromo] = useState(false)
  const [errorPromo, setErrorPromo] = useState(null)
  const [persent, setPersent] = useState(0)
  const [showPromo, setShowPromo] = useState(false)
  const dispatch = useDispatch();
  const total = useSelector(state=>state.card.total);
  const items = useSelector(state=>state.card.items);
  const cartWindow = useRef();
  const closeBtn = useRef();
 const navigate = useNavigate()

 

  const toCheckout = ()=>{
    if (total>0) {
      navigate('/checkout')
    }else return;
  }

  const validPromo = () => {
  
    const res = promocodes.find(obj => {return obj.name.toLowerCase() === promo.toLowerCase()})
    if(res){
      dispatch(setPromoSale(res.value))
      dispatch(setPromoName(res.name))
      setShowPromo(true)
      setPersent(res.value)
      setErrorPromo(null)
    }else{
      setShowPromo(false)
      dispatch(setPromoName(''))
      setErrorPromo("Promo doesn't exist!")
      dispatch(setPromoSale(0))
    }

    
    // if(e.target.value.length < 5)
    // setPromo(e.target.value)
  }
  console.log(total);
 
  return (
    <div className={popup === true ? `${styles.cart} ${styles.cartAbsolut}` : `${styles.cart}`  } ref={cartWindow} >
      
        <p className={styles.cart_title}>{t("Cart")}</p>
        <div className={styles.cart_container}>
        <div className={styles.cart_containerInner}>
          
          {items.length>0 ? items.map(obj =>  <CartItem {...obj} />) : <p className={styles.emptyCart}><img src="/img/empty.svg" alt="" /> {t("Your cart is emtpy")}</p> }
        
        </div>
        
        </div>
        <div className={styles.promo}>
          <input type="text" placeholder={t("Enter your promo code")} onChange={e=>setPromo(e.target.value)} />
          <img src="/img/promo.svg" alt="" onClick={validPromo} />
          {errorPromo && ( <span className='error'>{errorPromo}</span>)}
        </div>
        <div className={styles.total}>
          <span>{t("Total")}</span>
          <span><Convert usdPrice={total} /></span>
          
        </div>
       
        
        {showPromo && (<div className={styles.total}>
          <span>Promo -{persent}% </span>
          <span>{parseInt(total) * ((100 - persent) / 100)}$ </span>
        </div>)}
        
    </div>
  )
}
