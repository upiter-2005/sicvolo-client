import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Adress.module.scss";
import AdressItem from "../AdressItem";
import AdressModal from "../AdressModal"


export default function Adress() {
    const [active, setActive] = useState(false);
  
    const [addAdresId, setAddAdresId] = useState(1);
    const addresses = useSelector(state => state.user.user);

    const addAdres = () => {
      setActive(true);
    }

    useEffect(()=>{
      if(localStorage.getItem('city_4') || localStorage.getItem('country_4')) {
       
       
        return;
      }else{
        setAddAdresId(1)
      }
      if(localStorage.getItem('city_1') || localStorage.getItem('country_1')) {
        setAddAdresId(2)
        
      }
      if(localStorage.getItem('city_2') || localStorage.getItem('country_2')) {
        setAddAdresId(3)
     
      }
      if(localStorage.getItem('city_3') || localStorage.getItem('country_3')) {
        setAddAdresId(4)
        
      }
      
      
    
    }, [addAdresId])
  return (
    <>
    <div className={styles.adressWrap}>
      <h2>addresses</h2>
      <p>Main address</p>
        <div className={styles.adressRow}>
          {(localStorage.getItem('city_1') || localStorage.getItem('country_1')) 
          ? 
          <AdressItem 
          id={1}
          country={localStorage.getItem('country_1')} 
          city={localStorage.getItem('city_1')}  
          street={localStorage.getItem('street_1')} 
          flat={localStorage.getItem('flat_1')} 
          entry={localStorage.getItem('entry_1')} 
          zip={localStorage.getItem('postcode_1')} 
           />
        : 
        ""}
          {
            (localStorage.getItem('city_4') || localStorage.getItem('country_4')) 
            ? ''
            :
            (<a href="#" className={styles.addItem} onClick={addAdres}>
              <img src="img/addItem.svg" 
              alt="Account - add address icon"
              title="Account - add address icon"
              /> Add address
          </a>)
          }  
            
        </div>

      <p>Aditional addresses</p>
        <div className={styles.adressRow}>
          
          {(localStorage.getItem('city_2') || localStorage.getItem('country_2')) 
          ? 
          <AdressItem 
          id={2}
          country={localStorage.getItem('country_2')} 
          city={localStorage.getItem('city_2')}  
          street={localStorage.getItem('street_2')} 
          flat={localStorage.getItem('flat_2')} 
          entry={localStorage.getItem('entry_2')} 
          zip={localStorage.getItem('postcode_2')} 
          />
        : 
        ""}
          {(localStorage.getItem('city_3') || localStorage.getItem('country_3')) 
          ? 
          <AdressItem
          id={3}
          country={localStorage.getItem('country_3')} 
          city={localStorage.getItem('city_3')}  
          street={localStorage.getItem('street_3')} 
          flat={localStorage.getItem('flat_3')} 
          entry={localStorage.getItem('entry_3')} 
          zip={localStorage.getItem('postcode_3')} 
           />
        : 
        ""}
          {(localStorage.getItem('city_4') || localStorage.getItem('country_4')) 
          ? 
          <AdressItem 
          id={4}
          country={localStorage.getItem('country_4')} 
          city={localStorage.getItem('city_4')}  
          street={localStorage.getItem('street_4')} 
          flat={localStorage.getItem('flat_4')} 
          entry={localStorage.getItem('entry_4')} 
          zip={localStorage.getItem('postcode_4')} 
          />
        : 
        ""}
        </div>
        
    </div>
    <AdressModal active={active} closeModal={()=>setActive(false)} id={addAdresId}  />
    </>
    
  )
}
