import { useState, useEffect } from "react";
import styles from "./FilterButton.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {plusActiveCat, minusActiveCat,setPageCat, setSubCats} from "../../redux/slices/productsSlice";



export default function FilterButton({ value, catId }) {

  const activeCats = useSelector(state=>state.products.activeCats);
  const subCats = useSelector(state=>state.products.subCats);
  const pageCat = useSelector(state=>state.products.pageCat)
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const changeHandler = (val) => {
    dispatch(setPageCat(null))
    
    if(isActive === false){
      dispatch(plusActiveCat(val));
      setIsActive(true);
    }else{
      if(activeCats.length <= 1  && subCats.length === 0){
        return false;
      }
      dispatch(minusActiveCat(val));
      setIsActive(false);
    }
    
   
    if(val === 1 ){
     
      
    }
  
     
  };

  useEffect(()=>{
    if( pageCat === catId){
      setIsActive(true);
    }else{setIsActive(false);}

    activeCats?.forEach(obj => {
      if(obj === catId){setIsActive(true)}
    })
    if(activeCats.includes(1)){
      dispatch(setSubCats([]));
    }
  },[pageCat, catId, activeCats]);


  return (
    <button
      className={isActive ? `${styles.isActive} ${styles.filter_item} ` : `${styles.filter_item} `}
      onClick={() => changeHandler({ catId })}>
      {isActive ? <img src="/img/check.svg" alt="Sicvolo - filter ico"
          title="Sicvolo - filter ico" /> : <img src="/img/plus.svg" alt="Sicvolo - plus ico" title="Sicvolo - plus ico" />} {value}
    </button>
  );
}
