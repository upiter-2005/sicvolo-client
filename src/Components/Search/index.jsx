import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../redux/slices/productsSlice";
import {Link} from "react-router-dom"
import styles from "./Search.module.scss"
import { useTranslation  } from 'react-i18next';

export default function Search() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const allProducts = useSelector(state=>state.products.items)
  const [val, setVal] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  
  const searchHandle = (e) => {
    //window.fbq('track', 'Search',{value: e.target.value})
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
       <div className={styles.search}>
          <img src="/img/search.svg" className={styles.searchIco} alt="" />
           <img src="/img/close-cart.svg" className={styles.closeSearch} alt="" onClick={()=> {setSearchResult([]); setVal('')}} /> 
          <input type="text" value={val} placeholder={t("search")} onChange={e => searchHandle(e)} />
          <div className={styles.searchList}>
            <ul>
              {searchResult.map(obj => <li><Link to={`/product/${obj.slug}`} >{obj.name}</Link></li>)}
            </ul>
          </div>
        </div>
        <a href="#" className={styles.mobSearchOn}><img src="img/search.svg" alt="" /></a>
    </>
 
  )
}
