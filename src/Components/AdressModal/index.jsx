import {useState} from 'react';
import styles from "./AdressModal.module.scss"
import axios from "axios"

export default function AdressModal({active, closeModal, id}) {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [entrance, setEntrance] = useState('');
  const [apartment, setApartment] = useState('');
  const [code, setCode] = useState('');

  const updateAdres = async(e) => {
    e.preventDefault();

    let data = {};
    
    if(id === 1 ){
      data ={
        "acf": {
          "city_1" : city,
          "country_1": country,
          "entry_1": entrance,
          "flat_1": apartment,
          "postcode_1": code,
          "street_1": street,
        }
      };
    }
    if(id === 2 ){
      data ={
        "acf": {
          "city_1" : city,
          "country_2": country,
          "entry_2": entrance,
          "flat_2": apartment,
          "postcode_2": code,
          "street_2": street,
        }
      };
    }
    if(id === 3 ){
      data ={
        "acf": {
          "city_3" : city,
          "country_3": country,
          "entry_3": entrance,
          "flat_3": apartment,
          "postcode_3": code,
          "street_3": street,
        }
      };
    }
    if(id === 4 ){
      data ={
        "acf": {
          "city_4" : city,
          "country_4": country,
          "entry_4": entrance,
          "flat_4": apartment,
          "postcode_4": code,
          "street_4": street,
        }
      };
    }
   
    axios.post(`https://api.sicvolo.org/wp-json/wp/v2/users/${localStorage.getItem('userId')}`, data, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    ).then(res => {
       
        //toast("User info was updated!");
        localStorage.setItem( 'city_'+id, city);
        localStorage.setItem( 'country_'+id, country );
        localStorage.setItem( 'entry_'+id, entrance );
        localStorage.setItem( 'flat_'+id, apartment );
        localStorage.setItem( 'postcode_'+id, code );
        localStorage.setItem( 'street_'+id, street );

        window.location.reload();
        // dispatch(setAditionalDataUser(
        //   {
        //     user_phone: phone,
        //     user_last_name: lastName,
        //     id: res.data.id
        //   }
        // ));

      }).catch(err => console.log(err))
  }
  return (
    <div className={ active ? `${styles.modal}  ${styles.active}` :`${styles.modal}` } onClick={closeModal}>
      <div className={styles.modal__content} onClick={(e)=> e.stopPropagation()}>
        <h2>Adding new address</h2>
   
        <form onSubmit={updateAdres}>
          <img src="img/closeModal.svg" className={styles.closeModal} onClick={closeModal} 
          alt="Sicvolo - close icon"
          title="Sicvolo - close icon"  
          />
            <div className={styles.inputModalBox}>
              <input type="text" value={country} onChange={(e)=> setCountry(e.target.value)} placeholder='country' />
            </div>
            <div className={styles.inputModalBox}>
              <input type="text" value={city} onChange={(e)=> setCity(e.target.value)} placeholder='City' />
            </div>
            <div className={styles.inputModalBox}>
              <input type="text" value={street} onChange={(e)=> setStreet(e.target.value)} placeholder='Street' />
            </div>
            <div className={styles.inputModalBox}>
              <input type="text" value={entrance} onChange={(e)=> setEntrance(e.target.value)} placeholder='Entrance' />
            </div>
            <div className={styles.inputModalBox}>
              <input type="text" value={apartment} onChange={(e)=> setApartment(e.target.value)} placeholder='Apartment number' />
            </div>
            <div className={styles.inputModalBox}>
              <input type="text" value={code} onChange={(e)=> setCode(e.target.value)} placeholder='Postcode' />
            </div>
            <button type="submit" className={styles.saveBtn}>Save</button>
        </form>
      </div>
    </div>
  )
}
