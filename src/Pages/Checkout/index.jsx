import {useEffect,useState, useMemo } from 'react'
import styles from"./Checkout.module.scss"
import CartStatic from '../../Components/CartStatic'
import { showCard} from "../../redux/slices/cardSlice"
import {useDispatch, useSelector} from "react-redux";
import axios from "axios"
import {md5} from "../../utils/md5"
import Select from 'react-select'
import countriesDB from "../../utils/countriescities.json"
import ReactPixel from 'react-facebook-pixel';
import { useTranslation  } from 'react-i18next';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {liqpayCalc} from '../../utils/liqpayCalc'

import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';


export default function Checkout() {

  const navigate = useNavigate()
  const { t, i18n } = useTranslation();
    const DB_COUNTRRY = useMemo(() => {return countriesDB}, [])


    const [finalPrice, setFinalPrice] = useState(localStorage.getItem('total'));
    const [valid, setValid] = useState(false);
    const [countries, setCountries] = useState(null);
    const [cities, setCities] = useState(null);
    const [liqPayForm, setLiqPayForm] = useState('');

    const [firstError, setFirstError] = useState(null);
    const [secondError, setSecondError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [countryError, setCountryError] = useState(null);
    const [cityError, setCityError] = useState(null);
    const [streetError, setStreetError] = useState(null);
    const [enterenceError, setEnterenceError] = useState(null);
    const [stateError, setStateError] = useState(null);
    const [apartmentError, setApartmentError] = useState(null);
    const [zipError, setZipError] = useState(null);
    const [paymentError, setPaymentError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('paypal');
 
    const [isLegalError, setIsLegalError] = useState(null);

    const cartCount = useSelector(state=>state.card.items)
    const promoSale = useSelector(state=>state.card.promoSale)
    const total = useSelector(state=>state.card.total)
    const promoName = useSelector(state=>state.user.promo)

    //////formData/////
    const [countryForm, setCountryForm] = useState(null);
    const [promo, setPromo] = useState('');
    const [cityForm, setCityForm] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [enterence, setEnterence] = useState(null);
    const [company, setCompany] = useState('');
    const [state, setState] = useState('');
    const [apartment, setApartment] = useState('');
    const [zip, setZip] = useState('');
    const [comment, setComment] = useState('');
    const [payment, setPayment] = useState('');
    const [isLegal, setIsLegal] = useState(false);

    const [ukrIp, setUkrIp] = useState(false);


    const dispatch = useDispatch();

    const parseCities = (id) => {
        const country = countriesDB.find(obj=>obj.id === id);
        const res = country.cities.map((city) => ({
            label: city.name,
            value: city.id,
            ...city
          }))
          setCities(res)
    }

const liqpayCall = async() => {
  const products = JSON.parse(localStorage.getItem('cart'));
  let productsArr = '';
  products.forEach(obj => {
    console.log(obj);
     let {name} = obj;
     productsArr += name + ' | ' ;
    
  });

  const totalNum = await liqpayCalc(finalPrice);
  console.log(totalNum);
  const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/pay/doPayment`, { amount: totalNum, description: productsArr, currency: 'UAH' })

  setLiqPayForm(data)
}
const detectIp = async() => {
  axios
  .get("https://ipapi.co/json/")
  .then((response) => {
    let clientLng = response.data;
    if(clientLng.country_name === 'Ukraine'){setUkrIp(true)}
  })
}

useEffect(()=>{
    dispatch(showCard(false))
      const updatedCountries = countriesDB.map((country) => ({
      label: country.name,
      value: country.id,
      ...country
    }));
    setCountries(updatedCountries)
    liqpayCall();
    detectIp();
    if(window.fbq){
      window.fbq('track', 'ViewContent', { 
          content_type: 'Checkout page',
          content_ids: ['1234'],
          content_name: 'Checkout page',
          content_category: 'Checkout page',
         
        })
      window.fbq('track', 'PageView')
      window.fbq('track', 'InitiateCheckout', {value: localStorage.getItem('total') });
  }  
},[])


const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const validateFirstName = (e) => {
  if(!e.target.value || e.target.value.length < 3){setFirstError("Name is so short!"); setValid(false); setFirstName(e.target.value)}else{setFirstError(null); setValid(true);setFirstName(e.target.value)};
}

const validateSecondName = (e) => {
  if(!e.target.value || e.target.value.length < 3){setSecondError("Name is so short!"); setValid(false); setSecondName(e.target.value)}else{setSecondError(null); setValid(true);setSecondName(e.target.value)};
}

const validateemailValue = (e) => {
  if(!validateEmail(e.target.value)) {setEmailError("Email is not valid!"); setValid(false); setEmail(e.target.value)}else{setEmailError(null); setValid(true);setEmail(e.target.value)};
}

const validatePhoneValue = (e) => {
  if(!e.target.value || e.target.value.length < 10){setPhoneError("Phone is so short! At least should be 10 chars"); setValid(false);setPhone(e.target.value)}else{setPhoneError(null); setValid(true);setPhone(e.target.value)};
}
const validateStreet = (e) => {
  if(!e.target.value || e.target.value.length < 3){setStreetError("Street name is so short!"); setValid(false); setStreet(e.target.value)}else{setStreetError(null); setValid(true);setStreet(e.target.value)};
}
const validateEnterence = (e) => {
  if(!e.target.value ){setEnterenceError("Insert enterence number!"); setValid(false); setEnterence(e.target.value)}else{setEnterenceError(null); setValid(true); setEnterence(e.target.value)};
}
const validateSatte = (e) => {
  if(!e.target.value ){setStateError("Insert sate!"); setValid(false); setState(e.target.value)}else{setStateError(null); setValid(true); setState(e.target.value)};
}
const validateApartment = (e) => {
  if(!e.target.value ){setApartmentError("Insert apartment number!"); setValid(false); setApartment(e.target.value)}else{setApartmentError(null); setValid(true);setApartment(e.target.value)};
}
const validateZip = (e) => {
  if(!e.target.value ){setZipError("Insert ZIP code!"); setValid(false); setZip(e.target.value)}else{setZipError(null); setValid(true); setZip(e.target.value)};
}

const validateLegal = () => {
  if(isLegal === false){
    setIsLegal(true);
    setIsLegalError(null);
  }else{
    setIsLegal(false);
    setIsLegalError("Check agreement!")
  }
 

}

const submitHandler = (e)=>{
   
    e.preventDefault();
    if(cartCount.length === 0 ) {console.log('cart is empty'); return;};
    if(!firstName || firstName.length < 3){setFirstError("Name is so short!"); setValid(false)}else{setFirstError(null); setValid(true)};
    if(!secondName || secondName.length < 3){setSecondError("Second name is so short!"); setValid(false)}else{setSecondError(null); setValid(true)};
    
    if(!phone || phone.length < 10){setPhoneError("Phone is so short! At least should be 10 chars"); setValid(false)}else{setPhoneError(null); setValid(true)};
    if(!validateEmail(email)) {setEmailError("Email is not valid!"); setValid(false)}else{setEmailError(null); setValid(true)};

    if(!countryForm){setCountryError("Chose your country!"); setValid(false)}else{setCountryError(null); setValid(true)};
    if(!cityForm){setCityError("Chose your country!"); setValid(false)}else{setCityError(null); setValid(true)};

    if(!street || street.length < 3){setStreetError("Street name is so short!"); setValid(false)}else{setStreetError(null); setValid(true)};
    if(!enterence ){setEnterenceError("Insert enterence number!"); setValid(false)}else{setEnterenceError(null); setValid(true)};
    if(!state ){setStateError("Insert sate!"); setValid(false)}else{setStateError(null); setValid(true)};
    if(!apartment ){setApartmentError("Insert apartment number!"); setValid(false)}else{setApartmentError(null); setValid(true)};
    if(!zip ){setZipError("Insert ZIP code!"); setValid(false)}else{setZipError(null); setValid(true)};
    if(!payment ){setPaymentError("Choose payment method!"); setValid(false)}else{setPaymentError(null); setValid(true)};
    if(isLegal === false ){setIsLegalError("Check agreement!"); setValid(false)}else{setIsLegalError(null); setValid(true)};

    if(valid && isLegal){
      createOrder();
    }
    

}
    

const createOrder = async() => {

    const products = JSON.parse(localStorage.getItem('cart'));
    const productsArr = [];
    products.forEach(obj => {
       let {id, qty, sku} = obj;
       productsArr.push({product_id: id,quantity: qty,
         meta_data: [
          {
            "key": "SKU",
            "value": sku
          },
         ]})
      
    });
    

    const dataOrder = {
        payment_method: "bacs",
        payment_method_title: payment,
        set_paid: true,
        billing: {
          first_name: firstName,
          last_name: secondName,
          address_1: countryForm,
          address_2: cityForm,
          city: `Street: ${street} ${enterence}`,
          state: state,
          postcode: zip,
          country: `Apartment: ${apartment}`,
          email: email,
          phone: phone,
          
        },
       // customer_id: 12,
        customer_note: `promo code - ${promoName}` + comment,
        shipping: {
            first_name: firstName,
            last_name: secondName,
            address_1: countryForm,
            address_2: cityForm,
            city: `Street: ${street} ${enterence}`,
            state: `Apartment: ${apartment}`,
            postcode: zip,
            country: `Apartment: ${apartment}`,
        },
        line_items: productsArr,
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: "0"
          }
        ],
        meta_data: [
          {promo: "promoCustomize"}
        ]
    };
  
    try {
      const {data} =  await axios.post(`${process.env.REACT_APP_API_URL}/api/order/createOrder`, dataOrder);
      console.log(data);

      //const orderPermanent = JSON.parse(localStorage.getItem('cart'));
      if(localStorage.getItem('ordersStorage')){
        const oldStorage = JSON.parse(localStorage.getItem('ordersStorage'));
        const newStorage = [...oldStorage, {
          orderId: data.id,
          date: data.date_created,
          items: JSON.parse(localStorage.getItem('cart')),
          total: data.total
        }]
        localStorage.setItem('ordersStorage', JSON.stringify(newStorage));
      }else{
        const storage = [
          {
            orderId: data.id,
            date: data.date_created,
            items: JSON.parse(localStorage.getItem('cart')),
            total: data.total
          }
        ];
        localStorage.setItem('ordersStorage', JSON.stringify(storage));
      }



     //Payment function
       if(data !== undefined) {
        console.log('doo');
        //window.fbq('track', 'Lead');
        localStorage.removeItem('cart');
        if(ukrIp){ 
          document.getElementById('liqpayForm').submit();

        }else{
          document.getElementById('paymentForm').submit();
          console.log('westernBid');
        }
        
       
      }
    //Payment function
    } catch (error) {
        
    }
}

console.log(ukrIp);

useEffect(()=>{
  if(promoSale){
   let a = parseInt(localStorage.getItem('total')) * ((100 - promoSale) / 100);
   setFinalPrice(a);
  }else{
    setFinalPrice(localStorage.getItem('total'))

    //JSON.parse(localStorage.getItem('total'))
  }
},[promoSale])



  return (
    <div className={styles.checkout}>
        <div className={styles.checkout_mobTitle}>
        <h2>{t("PLACING AN ORDER")}</h2>
            {/* <p>{t("ck122")}</p> */}
        </div>
        <div className={styles.left}>
            <h2>{t("PLACING AN ORDER")}</h2>
            {/* <p>{t("ck122")}</p> */}
            <form onSubmit={submitHandler}>

                <div className={styles.fomrBlock}>
                    <div className={styles.fomrBlock_title}>
                        <span>1</span> Contacts
                    </div>

                 <div className={styles.inputContainer}><input type="text" value={firstName} onChange={e=>validateFirstName(e)} placeholder={t("Enter your name")} />
                 {firstError && (<div className={styles.error}>{firstError}</div> )}
                 </div>
                 <div className={styles.inputContainer}> <input type="text" value={secondName} onChange={e=>validateSecondName(e)} placeholder={t("Enter your second name")} />
                 {secondError && (<div className={styles.error}>{secondError}</div> )}
                 </div>
                 <div className={styles.inputContainer}><input type="text" value={email} onChange={e=>validateemailValue(e)} placeholder={t("Email")} />
                 {emailError && (<div className={styles.error}>{emailError}</div> )}
                 </div>
                 <div className={styles.inputContainer}><input type="text" value={phone} onChange={e=>validatePhoneValue(e)} placeholder={t("Enter your mobile phone")} />
                 {phoneError && (<div className={styles.error}>{phoneError}</div> )}
                 </div>
                </div>



                <div className={styles.fomrBlock}>

                    <div className={styles.fomrBlock_title}>
                        <span>2</span> {t("Delivery address")}
                    </div>
                    <img src="/img/delivery.png" alt="" className={styles.deliveryImg} />

                    <div className={styles.fomrBlock_box}> <input type="checkbox" id="delivery-input"  /> <label htmlFor="delivery-input">{t("I am the recipient of the order")}</label></div>

                    <div className={styles.inputContainer}><Select 
                        options={countries} 
                        onChange={(value) => {
                            //setValues({ country: value.label, idCountry: value.value, state: null, city: null });
                            setCountryForm(value.name);
                            parseCities(value.value);
                            setCountryError(null);
                            setValid(true);
                          }}
                        className="country-select"
                        classNamePrefix="react-select"
                        styles={{
                         control: (baseStyles, state) => ({
                           ...baseStyles,
                           boxShadow: 'none',
                           
                         }),
                         menu: (provided, state) => ({
                             ...provided,
                             border: "none",
                             boxShadow: "none",
                             backgroundColor: "#131313"
                           }),
                         option: (provided, state) => ({
                             ...provided,
                             color: "#fff",
                             fontSize: 16,
                             backgroundColor: state.isFocused ? "#333" : "#1a1a1a",
                             cursor: "pointer",
                             borderColor: "#333",
                             outline: "none",
                             border: "none"
             
                         })
                       }}
                    />
                      {countryError && (<div className={styles.error}>{countryError}</div> )}
                      </div>
                    
                    <div className={styles.inputContainer}>
                    <Select 
                        options={cities}  
                       // defaultValue={options[236]}
                        onChange={(value) => {console.log(value);
                            setCityForm(value.name);
                            setCityError(null);
                            setValid(true);
                          }}
                        className="country-select"
                        classNamePrefix="react-select"
                        styles={{
                         control: (baseStyles, state) => ({
                           ...baseStyles,
                            boxShadow: 'none',
                           
                         }),
                         menu: (provided, state) => ({
                             ...provided,
                             border: "none",
                             boxShadow: "none",
                             backgroundColor: "#131313"
                           }),
                         option: (provided, state) => ({
                             ...provided,
                             color: "#fff",
                             fontSize: 16,
                             backgroundColor: state.isFocused ? "#333" : "#1a1a1a",
                             cursor: "pointer",
                             borderColor: "#333",
                             outline: "none",
                             border: "none"
             
                         })
                       }}
                    />
                    {cityError && (<div className={styles.error}>{cityError}</div> )}
                    </div>
                   
                 
                 <div className={styles.inputContainer}> <input type="text" value={street} onChange={e=>validateStreet(e)} placeholder={t("Street")} />   {streetError && (<div className={styles.error}>{streetError}</div> )}</div>
                 <div className={styles.inputContainer}><input type="text" value={enterence} onChange={e=>validateEnterence(e)} placeholder={t("Entrance")} />
                 {enterenceError && (<div className={styles.error}>{enterenceError}</div> )}</div>
                 <div className={styles.inputContainer}><input type="text" value={company} onChange={e=>setCompany(e.target.value)} placeholder={t("Company name")} />
                 </div>
                 <div className={styles.inputContainer}><input type="text" value={state} onChange={e=>validateSatte(e)} placeholder={t("State")} />
                    {stateError && (<div className={styles.error}>{stateError}</div> )}
                 </div>
                 <div className={styles.inputContainer}><input type="text" value={apartment} onChange={e=>validateApartment(e)} placeholder={t("Apartment number")} />
                    {apartmentError && (<div className={styles.error}>{apartmentError}</div> )}
                 </div>
                 <div className={styles.inputContainer}><input type="text" value={zip} onChange={e=>validateZip(e)} placeholder={t("ZIP Code")} />
                    {zipError && (<div className={styles.error}>{zipError}</div> )}
                 </div>
                   
                </div>


                <div className={styles.fomrBlock}>
                    <div className={styles.fomrBlock_title}>
                        <span>3</span> {t("Payment method")}
                    </div>
                    {/* {paymentError && (<div className={styles.errorRelative}>{paymentError}</div> )} */}

                    {ukrIp ? (<><div className={styles.radio}>
                         <input type="radio"
                          id="liqpay"
                          value="liqpay" 
                          onChange={(e)=>{setPayment(e.target.value); setPaymentError(null)}} 
                          name="payment"  />
                          <label htmlFor="liqpay" className={styles.checkmark}>LiqPay</label>
                    </div></>)
                     :
                      (<><div className={styles.radio}>
                        <input type="radio"
                         id="stripe"
                         value="stripe.com"
                         onChange={(e)=>{setPayment(e.target.value); setPaymentError(null)}} 
                         name="payment" /> 
                        <label htmlFor="stripe" className={styles.checkmark}>Stripe</label>
                    </div>
                   <div className={styles.radio}>
                         <input type="radio"
                          id="cash"
                          value="paypal" 
                          onChange={(e)=>{setPayment(e.target.value); setPaymentError(null)}} 
                          name="payment"  />
                          <label htmlFor="cash" className={styles.checkmark}>Рaypal</label>
                    </div></>) }
                    
                    
                    {paymentError &&  (<div className={styles.paymentErrorBox}>{paymentError}</div> )}
                  {/*  <div className={styles.radio}>
                        <input type="radio" id="Paypal" value="Paypal" onChange={(e)=>setPayment(e.target.value)} name="payment" /> <label htmlFor="Paypal" className={styles.checkmark}>Paypal</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" id="master" value="master" onChange={(e)=>setPayment(e.target.value)} name="payment" /> <label htmlFor="master" className={styles.checkmark}>Mastercard, visa</label>
                    </div> */}
                  
                  <textarea name="" id="" placeholder='Additional Information' value={comment} onChange={e=>setComment(e.target.value)}></textarea>
                  <div className={styles.fomrBlock_box} >
                     <input type="checkbox" id="privacy" onChange={()=>validateLegal()}  /> 
                     <label htmlFor="privacy">{t("By clicking the 'Make an order' button, I agree to the terms of the offer agreement")}</label>
                      {isLegalError && (<div className={styles.error}>{isLegalError}</div> )}
                     </div>
                </div>
                <button type="submit" className={styles.orderSubmit}>{t("Order")}</button>
             


            </form>


  <form method="post" action="https://shop.westernbid.info" id="paymentForm">
    <input type="hidden" name="charset" value="utf-8" />
    <input type="hidden" name="gate" value={payment} />
    <input type="hidden" name="wb_login" value="149483" />
    {/* <input type="hidden" name="wb_hash" value={md5(  "148922SlAqoQU" + JSON.parse(localStorage.getItem('total')) +  "xx1111")} /> */}
    <input type="hidden" name="wb_hash" value={md5(  "149483cpGpVqb" + finalPrice +  "xx1111")} />
    <input type="hidden" name="invoice" value="xx1111" />
    <input type="hidden" name="email" value={email} />
    <input type="hidden" name="phone" value={phone} />

    <input type="hidden" name="first_name" value={firstName} />
    <input type="hidden" name="last_name" value={secondName} />
    <input type="hidden" name="address1" value={street} />
    <input type="hidden" name="country" value={countryForm} />
    <input type="hidden" name="city" value={cityForm} />
    <input type="hidden" name="state" value={state} />
    <input type="hidden" name="zip" value={zip} />

    <input type="hidden" name="item_name" value="Order name" />
    {/* <input type="hidden" name="amount" value={JSON.parse(localStorage.getItem('total')) } /> */}
    <input type="hidden" name="amount" value={finalPrice } />
    <input type="hidden" name="shipping" value="0" />
    <input type="hidden" name="currency_code" value="USD" />
    {
      JSON.parse(localStorage.getItem('cart')).map((obj, i) => (
      <>
          <input type="hidden" name={`item_name_${i+1}`} value={obj.name} />
          <input type="hidden" name={`description_${i+1}`} value={obj.name} />
          <input type="hidden" name={`url_${i+1}`} value={obj.url} />
          <input type="hidden" name={`item_number_${i+1}`} value={obj.sku} />
          <input type="hidden" name={`amount_${i+1}`} value={(obj.price * ((100 - promoSale) / 100)).toFixed(0)} />
          <input type="hidden" name={`quantity_${i+1}`} value={obj.qty} />
      </>
        
      ))
    }               
    <input type="hidden" name="return" value="http://sicvolo.com/" />
    <input type="hidden" name="cancel_return" value="http://sicvolo.com/" />
    <input type="hidden" name="notify_url" value="http://sicvolo.com/" />
    <input type="submit" value="Submit" />
</form>
{/* 
{ukrIp && parse(liqPayForm)} */}
{console.log(liqPayForm.data)}

<form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8" id="liqpayForm">
<input type="hidden" name="data"
value={liqPayForm?.data?.data}/>
<input type="hidden" name="signature" value={liqPayForm?.data?.signature}/>
<button type="submit">Send</button>
</form>

        </div>
        <div className={styles.right}>
            <CartStatic popup={false} />
        </div>
        
    </div>
  )
}

