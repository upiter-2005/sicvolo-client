import { useState, useEffect } from "react";

import styles from "./Login.module.scss";
import Runing from "../../Components/Runing";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import {setAuth, setUser, setAditionalDataUser, setAddresses} from "../../redux/slices/userSlice";
import axios from 'axios';
import { useTranslation  } from 'react-i18next';


export default function Login() {
  const { t, i18n } = useTranslation();
  const isAuth = useSelector(state => state.user.isAuth);
  const user = useSelector(state => state.user.user);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passType, setPassType] = useState('password');
  const [remember, setRemember] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const getMe = async() => {
    const token = localStorage.getItem('token');
    axios.get( `${process.env.REACT_APP_SITE_URL}/wp-json/wp/v2/users/me`, 
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                } 
   ).then(res=>{
        console.log(res.data);
  
          localStorage.setItem( 'userPhone', res.data.acf.user_phone );
          localStorage.setItem( 'userName', res.data.acf.user_first_name );
          localStorage.setItem( 'userLastName', res.data.acf.user_last_name );
          localStorage.setItem( 'city_1', res.data.acf.city_1 );
          localStorage.setItem( 'city_2', res.data.acf.city_2 );
          localStorage.setItem( 'city_3', res.data.acf.city_3 );
          localStorage.setItem( 'city_4', res.data.acf.city_4 );
          localStorage.setItem( 'country_1', res.data.acf.country_1 );
          localStorage.setItem( 'country_2', res.data.acf.country_2 );
          localStorage.setItem( 'country_3', res.data.acf.country_3 );
          localStorage.setItem( 'country_4', res.data.acf.country_4 );
          localStorage.setItem( 'entry_1', res.data.acf.entry_1 );
          localStorage.setItem( 'entry_2', res.data.acf.entry_2 );
          localStorage.setItem( 'entry_3', res.data.acf.entry_3 );
          localStorage.setItem( 'entry_4', res.data.acf.entry_4 );
          localStorage.setItem( 'flat_1', res.data.acf.flat_1 );
          localStorage.setItem( 'flat_2', res.data.acf.flat_2 );
          localStorage.setItem( 'flat_3', res.data.acf.flat_3 );
          localStorage.setItem( 'flat_4', res.data.acf.flat_4 );
          localStorage.setItem( 'postcode_1', res.data.acf.postcode_1 );
          localStorage.setItem( 'postcode_2', res.data.acf.postcode_2 );
          localStorage.setItem( 'postcode_3', res.data.acf.postcode_3 );
          localStorage.setItem( 'postcode_4', res.data.acf.postcode_4 );
          localStorage.setItem( 'street_1', res.data.acf.street_1 );
          localStorage.setItem( 'street_2', res.data.acf.street_2 );
          localStorage.setItem( 'street_3', res.data.acf.street_3 );
          localStorage.setItem( 'street_4', res.data.acf.street_4 );


          localStorage.setItem( 'userId', res.data.id );
          localStorage.setItem( 'rememberMe', true );
       
     
        dispatch(setAditionalDataUser(
          {
            user_phone: res.data.acf.user_phone,
            user_last_name: res.data.acf.user_last_name,
            user_first_name: res.data.acf.user_first_name,
            id: res.data.id
          }
        ));
        
          navigate('/account');
        
      }
    ).catch(err => console.log(err))
  }

const handleSubmit = (e) =>{
  e.preventDefault();

  const data = {
    username: login, 
    password
  }

  axios.post( `${process.env.REACT_APP_SITE_URL}/wp-json/jwt-auth/v1/token`, data )
				.then( res => {
					if ( undefined === res.data.token ) {
						console.log( { error: res.data.message, loading: false } );
						return;
					}
					const { token, user_nicename, user_email } = res.data;
          localStorage.setItem( 'token', token );
          localStorage.setItem( 'userEmail', user_email );
         
					

          dispatch(setAuth(token));
          dispatch(setUser({ token, user_nicename, user_email }));
          getMe();
					
      
          
				} )
				.catch( err => {
          alert(err.response.data.message);
					
				} )
}

useEffect(()=>{
  
}, [isAuth])

useEffect(()=>{
  if(window.fbq){
    window.fbq('track', 'ViewContent', { 
        content_type: 'Login page',
        content_ids: ['1234'],
        content_name: 'Login page',
        content_category: 'Login page',
       
      })
    window.fbq('track', 'PageView')
  }
}, [])

const toggleType = () => {
  if( passType === "password"){
    setPassType('text');
  }else{
    setPassType('password');
  }
}

  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div className={styles.loginWrapper}>
        <img src="img/rings_3.png" alt="" className={styles.absImg} />
        <div className={styles.loginWrapper_left}>
          <p>{t("WE’D LOVE YOU TO")}</p>
          <p>{t("BECAME A PART OF OUR")}</p>
          <p>{t("COMMUNITY")} </p>
        </div>
        <div className={styles.loginWrapper_right}>
          <form onSubmit={handleSubmit}>
            <h1>{t("LOG IN")}</h1>

            <input 
              type="text"
              name="email"
              value={login}
              onChange={(e)=>setLogin(e.target.value)}
              placeholder={t("User name or email adress")}
            />

            <div className={styles.passwordBlock}>
              <input
               type={passType}
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder={t("Password")}
              />

              <span className={styles.showPass} onClick={toggleType}>
              {(passType === "password") ? (<img src="img/hide.svg" alt="" />) : (<img src="img/show.svg" alt="" />)}
                
              </span>
            </div>

            <div className={styles.formCheck} onClick={()=> setRemember(!remember)}>
              <span className={styles.remember} >
                {remember && (<img src="img/greenCheck.svg" alt="" />)}
              </span>{" "}
              {t("Remember me")}
            </div>

            <button type="submit" disabled={isAuth} class={styles.accBtn}>
            {t("LOG IN")}
            </button>
            <p className={styles.ask}>
            {t("Forgot your")}  <Link to="/recovery">{t("Password")}</Link>?
            </p>
            <p className={styles.ask}>
            {t("Don't have an account yet?")} <Link to="/register">{t("Register")}</Link>
            </p>
          </form>
        </div>
      </div>
      <Runing />
    </>
  );
}
