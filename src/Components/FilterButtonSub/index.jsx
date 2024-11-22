import { useState, useEffect } from "react";
import styles from "./FilterButtonSub.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {setSubCats, plusSubCat, minusSubCat,minusActiveCat} from "../../redux/slices/productsSlice";



export default function FilterButtonSub({ value, catId }) {

  const subCats = useSelector(state=>state.products.subCats);
  const activeCats = useSelector(state=>state.products.activeCats)
  const pageCat = useSelector(state=>state.products.pageCat)
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const changeHandler = (val) => {
  
    if(activeCats.includes(1)){
      console.log("allllllllllllllllllll");
      dispatch(minusActiveCat(1));
    }
    // if(activeCats.includes(1)){
    
    //   // dispatch(setSubCats([]));
    //   dispatch(minusActiveCat(1));
    //   setIsActive(!isActive);
    // }
      if(isActive === false){
        dispatch(plusSubCat(val));
        setIsActive(true);
      }else{
        if(subCats.length <= 1  && activeCats.length === 0){
          return false;
        }
        dispatch(minusSubCat(val));
        setIsActive(false);
      }
    
   
    
  };

  useEffect(()=>{
  
    if( pageCat === catId){
      setIsActive(true);
    }else{setIsActive(false);}

    
    subCats?.forEach(obj => {
      if(obj === catId){setIsActive(true)}
    })
  
  },[pageCat, catId, subCats, activeCats]);


  return (
    <button
      className={isActive ? `${styles.isActive} ${styles.filter_item} ` : `${styles.filter_item} `}
      onClick={() => changeHandler({ catId })}>
      {isActive ? <img src="/img/check.svg" alt="Sicvolo - filter ico" title="Sicvolo - filter ico" /> : <img src="/img/plus.svg" alt="Sicvolo - plus ico" title="Sicvolo - plus ico" />} {value}
    </button>
  );
}
