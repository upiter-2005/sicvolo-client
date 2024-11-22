import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../redux/slices/productsSlice";
import {setSearchMob} from "../../redux/slices/userSlice";
import {Link} from "react-router-dom"
import styles from "./SearchMobile.module.scss"
import { useTranslation  } from 'react-i18next';

export default function SearchMobile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const allProducts = useSelector(state=>state.products.items)
  const searchMob = useSelector(state=>state.user.searchMob);
  const [val, setVal] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  
  const searchHandle = (e) => {
    window.fbq('track', 'Search',{value: e.target.value})
    setVal(e.target.value)
    if(val.length <2){setSearchResult([]);return false}
    
    const res = allProducts?.filter(obj => obj.name.toLowerCase().includes(val));
    setSearchResult(res);
   
  }


  
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
   

       <div className={searchMob ? `${styles.SearchMobile} ${styles.activeMobMnu}` : ''}>
       <img src="/img/close-cart.svg" className={styles.close} alt="" onClick={()=> dispatch(setSearchMob(false))} />
          
          <input type="text" value={val} placeholder={t("search")} onChange={e => searchHandle(e)} />
          <div className={styles.searchList}>
            <ul>
              {searchResult.map(obj => <li><Link to={`/product/${obj.slug}`} onClick={()=> dispatch(setSearchMob(false))}>{obj.name}</Link></li>)}
            </ul>
          </div>
        </div>
        
    </>
 
  )
}
