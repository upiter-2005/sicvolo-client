import {useEffect, useState, useRef} from 'react'
import styles from "./Cart.module.scss"
import CartItem from "../CartItem"
import Convert from "../Convert"
import { useSelector, useDispatch } from "react-redux";
import {showCard} from "../../redux/slices/cardSlice"
import {useNavigate} from "react-router-dom"
import { useTranslation  } from 'react-i18next';

export default function Cart({popup}) {
  const { t, i18n } = useTranslation();
  const [disable, setDisable] = useState(false)
  const dispatch = useDispatch();
  const total = useSelector(state=>state.card.total);
  const items = useSelector(state=>state.card.items);
  const cartWindow = useRef();
  const closeBtn = useRef();
 const navigate = useNavigate()

  useEffect(()=>{
    const handleClick = (event) => {
      const callBtn = document.getElementById('popupCartBtn');
      document.getElementById('popupCartBtn').addEventListener('click', function(e){
        e.stopPropagation()
        dispatch(showCard(true));
      })
    
    };
   

    return () => document.body.removeEventListener('click', handleClick);

  }, [showCard])

  const toCheckout = ()=>{
    if (total>0) {
      navigate('/checkout')
    }else return;
  }
 
  return (
    <div className={styles.cartModal} onClick={()=>dispatch(showCard(false))}>
      <div className={popup === true ? `${styles.cart} ${styles.cartAbsolut}` : `${styles.cart}`  } onClick={e=>e.stopPropagation()} >
      <button className={styles.closeCart} ref={closeBtn} onClick={()=>{ dispatch(showCard(false));}}><img src="/img/close-cart.svg" 
      alt="Cart - close icon"
      title="Cart - close icon" 
       /></button>
        <p className={styles.cart_title}>{t("Cart")}</p>
        <div className={styles.cart_container}>
        <div className={styles.cart_containerInner}>
          
          {items.length>0 ? items.map(obj =>  <CartItem {...obj} />) : <p className={styles.emptyCart}><img src="/img/empty.svg" 
          alt="Cart - empty icon"
          title="Cart - empty icon" 
           /> {t("Your cart is emtpy")}</p> }
        
        </div>
        
        </div>
        {/* <div className={styles.promo}>
          <input type="text" placeholder="Enter your promo code" />
          <img src="/img/promo.svg" alt="" />
        </div> */}
        <div className={styles.total}>
          <span>{t("Total")}</span>
          <span><Convert usdPrice={total} /> ({total}$ )</span>
        </div>
     
        <button className={styles.makeOrder} onClick={toCheckout} >{t("Make order")}</button>
    </div>
    </div>
    
  )
}
