import { useState, useEffect } from "react";
import styles from "./Register.module.scss";
import Runing from "../../Components/Runing";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {registerUser} from "../../redux/slices/userSlice"
import { useTranslation  } from 'react-i18next';



export default function Register() {
  const { t, i18n } = useTranslation();
  const [remember, setRemember] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passType, setPassType] = useState('password');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [valid, setValid] = useState(false);

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [repeatPassError, setRepeatPassError] = useState(null);
  const navigate = useNavigate();

  const user = useSelector(state => state.user.user);
  const wasRegistered = useSelector(state => state.user.wasRegistered);

  const dispatch = useDispatch();


  const validateEmail = (e) => {
    setEmail(e.target.value)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = regex.test(e.target.value);
    if(!result){
      setEmailError("Mail is not valid!");
      setValid(false);
      return false;
    }else{
      setEmailError(null);
      setValid(true);
      return true;
    }
}

const validatePass = (e) => {

  setPassword(e.target.value);
  if(e.target.value.length < 5 || e.target.value !== repeatPassword){
    if(e.target.value.length < 5 ){
      setPassError("Password is so short!");
      setValid(false);
      return false;
    }else{
      setPassError(null);
      //setPassError("Password is not equal!");
      setValid(false);
      return false;
    }
     
    
  }else{
    setPassError(null); setRepeatPassError(null); setValid(true); return true;
  }
}
const validateRepeatPass = (e) => {

  setRepeatPassword(e.target.value)
  if(e.target.value.length < 5 || e.target.value !== password){
    if(e.target.value.length < 5 ){
      setRepeatPassError("Confirm password is so short!");
      setValid(false);
      return false;
    }else{
      setRepeatPassError(" Confirm password is not equal!");
      setValid(false);
      return false;
    }
    
  }else{
    setRepeatPassError(null); setPassError(null); setValid(true); return true;
  };
}
const validateName = (e) => {
  setUsername(e.target.value)
  if(!e.target.value || e.target.value.length < 3){setNameError("Name is so short!"); setValid(false); return false;}else{setNameError(null); setValid(true); return true;};
}

  const submitHandler = async(e) => {
    console.log('submit')
    
    // validateName()
    // validateEmail()
    // validatePass()
    // validateRepeatPass()

        if(valid){
        const data = {
            username,
            email,
            password,
          }
          
          dispatch(registerUser(data));
        }
    else{
      return false;
    }
    e.preventDefault();
  }

  const toggleType = () => {
    if( passType === "password"){
      setPassType('text');
    }else{
      setPassType('password');
    }
  }

  useEffect(()=>{
    if(window.fbq){
      window.fbq('track', 'ViewContent', { 
          content_type: 'Register page',
          content_ids: ['1234'],
          content_name: 'Register page',
          content_category: 'Register page',
         
        })
      window.fbq('track', 'PageView')
    }
  }, []);

  useEffect(()=>{
    if(wasRegistered) navigate('/login');
  }, [wasRegistered]);

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
          <form onSubmit={submitHandler}>
            <h1>{t("Sign up")} </h1>

            <div className="registerInputBox">
            <input type="text" value={username} placeholder={t("Login name")}  onChange={(e)=>validateName(e)} />
            {nameError && (<div className="error">{nameError}</div> )}
            </div>
            <div className="registerInputBox">
            <input type="text" placeholder={t("User name or email adress")} value={email}  onChange={(e)=>validateEmail(e)}/>
            {emailError && (<div className="error">{emailError}</div> )}
            </div>
            
            <div className={styles.passwordBlock}>
              <input type={passType} placeholder={t("Password")} value={password}  onChange={(e)=>validatePass(e)} />
              <span className={styles.showPass} onClick={toggleType}>
              {(passType === "password") ? (<img src="img/hide.svg" alt="" />) : (<img src="img/show.svg" alt="" />)}
              </span>
              {passError && (<div className="errorPasw">{passError}</div> )}
            </div>
            <div className={styles.passwordBlock}>
              <input type={passType} placeholder={t("Confirm password")}  value={repeatPassword} onChange={(e)=>validateRepeatPass(e)} />
              <span className={styles.showPass} onClick={toggleType}>
              {(passType === "password") ? (<img src="img/hide.svg" alt="" />) : (<img src="img/show.svg" alt="" />)}
              </span>
              {repeatPassError && (<div className="errorPasw">{repeatPassError}</div> )}
            </div>

            {/* <div className={styles.formCheck}>
              <button className={styles.remember}>
                <img src="img/greenCheck.svg" alt="" />
              </button>{" "}
              Remember me
            </div> */}
            

            <div className={styles.formCheck} onClick={()=> setRemember(!remember)}>
              <span className={styles.remember} >
                {remember && (<img src="img/greenCheck.svg" alt="" />)}
              </span>{" "}
              {t("Subscribe for newsletter")}
            </div>

            <button type="submit" class={styles.accBtn} >
            {t("Sign up")}
            </button>
            <p className={styles.ask}>
            {t("Already have an account?")}  <Link to="/login"> {t("LOG IN")} </Link>
            </p>
            
          </form>
        </div>
      </div>
      <Runing />
    </>
  );
}
