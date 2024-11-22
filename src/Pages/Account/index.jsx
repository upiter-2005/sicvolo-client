import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from "./Account.module.scss";
import {logout, setSwipe} from "../../redux/slices/userSlice";


import Profile from "../../Components/Profile";
import Adress from "../../Components/Adress";
import Orders from "../../Components/Orders";


export default function Account() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const isAuth = useSelector(state => state.user.isAuth);
  const isSwipe = useSelector(state => state.user.isSwipe);
  const [tab, setTab] = useState("profile");
  const [swipeTab, setSwipeTab] = useState(false);


  const handlerLogout = () => {
    dispatch(logout());
    navigate('/login');
  }


  const handleTabs = () =>{ 
    if(window.innerWidth < 768){
      dispatch(setSwipe(true));
    }
  }
  

  return (
    <div className={isSwipe ? `${styles.accountWrapper} ${styles.swipe}` : `${styles.accountWrapper}`}>
      <div className={styles.left}>
        <button onClick={() => {setTab('orders'); handleTabs()}}>My orders</button>
        <button onClick={() => {setTab('profile'); handleTabs()}}>Profile</button>
        <button onClick={() => {setTab('adress'); handleTabs()}}>Addresses</button>
        <button onClick={handlerLogout}>Exit</button>

      </div>
      <div className={styles.right}>
        <span className={styles.back} onClick={()=>dispatch(setSwipe(false))}><img src="/img/back.svg" alt="" />Back</span>
        {tab === "profile" && <Profile />}
        {tab === "adress" && <Adress />}
        {tab === "orders" && <Orders />}
      </div>
    </div>
  )
}
