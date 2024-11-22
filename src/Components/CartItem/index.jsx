import {useState, useEffect} from 'react'
import styles from "./CartItem.module.scss"
import { useSelector, useDispatch } from "react-redux";
import {removeItem, plusItem, minusItem} from "../../redux/slices/cardSlice"

export default function CartItem({id,  name,  price,   img,  size,  qty,  cartItemId}) {
  const[cartQty, setCartQty] = useState(1);

  const dispatch = useDispatch();

  const plusQty = () => {
    setCartQty(cartQty + 1);
    dispatch(plusItem(cartItemId));
}
const minusQty = () => {
    if(cartQty === 1){  return false; }
    setCartQty(cartQty - 1);
    dispatch(minusItem(cartItemId));
    
}

  const deleteFromCart = () => {
    dispatch(removeItem(cartItemId));
  }

  useEffect(()=>{
    setCartQty(qty)
  }, [])
  return (
    
    <div className={styles.cart_item}>
        <div className={styles.cart_itemTop}>
          <img src={img} 
          alt="Cart - product img"
          title="Cart - product img"
          className={styles.cart_itemImg} />
          <div className={styles.cart_itemData}>
            <p>{name} </p>
            {(!name.includes('Only buckle') && size !== 0  )? ( <div className={styles.cart_itemData_box}>Size <span>{size}</span>
            </div>) : ''}
            
           
         
          </div>
          <button className={styles.cart_itemData_delete} onClick={deleteFromCart}><img src="/img/delete.svg" 
          alt="Cart - delete icon"
          title="Cart - delete icon"
           /></button>
        </div>
        <div className={styles.cart_item_bottom}>
          <div className={styles.cart_item_qty}>
            <button onClick={minusQty}>-</button>
            <span>{cartQty}</span>
            <button onClick={plusQty}>+</button>
          </div>
          <div className={styles.cart_item_price}>
            {/* <span className={styles.cart_item_price_old}>5 700 $</span> */}
            <span>{price * qty}$</span>
          </div>
        </div>
    </div>
  )
}
