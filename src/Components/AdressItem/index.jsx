import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdressUpdateModal from "../AdressUpdateModal"
import styles from "./AdressItem.module.scss";

export default function AdressItem({country, city, street, flat,entry,zip, id  }) {

  const [activeUpdate, setActiveUpdate] = useState(false);

  const addresses = useSelector(state => state.user.addresses);

  const handleUpdate = () => {
    setActiveUpdate(true)
  }
  return (
    <>
 <div className={styles.adressItem}>
      <div className={styles.topRow}>
        <span><img src="img/location.svg" 
        alt="Account - location icon"
        title="Account - location icon" 
        /> {country} / {city}</span>
        <button onClick={handleUpdate}><img src="img/editIco.svg" 
        alt="Account - edit icon"
        title="Account - edit icon" 
        /></button>
      </div>
      <div className={styles.adressRow}>
        <p>Country/region</p>
        <span>{country}</span>
      </div>
      <div className={styles.adressRowFlex}>
        <div>
          <span>City</span>
          <span>{city}</span>
        </div>
        <div>
          <span>Street</span>
          <span>{street}</span>
        </div>
      </div>
      <div className={styles.adressRowFlex}>
        <div>
          <span>Flat</span>
          <span>{flat}</span>
        </div>
        <div>
          <span>Entry</span>
          <span>{entry}</span>
        </div>
        <div>
          <span>ZIP Code</span>
          <span>{zip}</span>
        </div>
      </div>
    </div>
    <AdressUpdateModal active={activeUpdate} closeModal={()=>setActiveUpdate(false)} id={id}  />

    </>
   
  )
}
