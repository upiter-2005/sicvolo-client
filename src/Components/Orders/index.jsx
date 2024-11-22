import {useState, useEffect} from 'react';
import styles from "./Orders.module.scss";
import {Link} from "react-router-dom"

import OrderItem from "../OrderItem"

export default function Orders() {
    const [active, setActive] = useState(false);
    const [orders, setOrders] = useState(null);


    useEffect(()=>{
      setOrders(JSON.parse(localStorage.getItem('ordersStorage')));
    },[])

  return (
    <>
      <div className={styles.ordersWrapper}>
        <h2>Orders</h2>
        {!orders ? (<><p className={styles.noOrders}>
          <img src="/img/cart.svg" alt="Sicvolo - cart icon"
      title="Sicvolo - cart icon" />You don't have any orders</p> <Link to="/catalog" className={styles.saveBtn}>Make order</Link></> ) : ''}
        {orders && orders?.map(obj => (<>
          <p className={styles.numberOrder}>Order №{obj.orderId} <span className={styles.dateOrder}>{obj.date}</span></p>
            {obj.items.map(item =>  <OrderItem 
                                        img={item.img} 
                                        name={item.name} 
                                        price={item.price} 
                                        qty={item.qty} 
                                        size={item.size}
                                        sku={item.sku}
                                        url={item.url}
                                         />)}
          <div className={styles.totalOrder}>
          <span>Total:</span>
          <span>{obj.total} $</span>
        </div>
        </>
          )
        )}
      
       
       
     
      </div>
    </>
  );
}
