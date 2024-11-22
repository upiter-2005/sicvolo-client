import { useState, useEffect } from "react";
import styles from "./Recovery.module.scss";
import Runing from "../../Components/Runing";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../../redux/slices/userSlice"
import { toast  } from 'react-toastify';
import axios from "axios"



export default function Recovery() {
  
  const [codeRecieve, setCodeRecieve] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passType, setPassType] = useState('password');

  const navigate = useNavigate();

  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();



const sendCode = async(e) => {
  e.preventDefault();
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/customers/sendCodeToEmail/`, {email}
  
  ).then(res => {
     
      toast("A password reset email has been sent to your email address.");
      setCodeRecieve(true)
    }).catch(err => console.log(err))
}

const changePass = async(e) => {
  e.preventDefault();
  
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/customers/resetCustomerPasswordWithCode/`, {email,
    code,
    newPassword: password}
  
  ).then(res => {
      
   
      if( res.status === 200){
        toast("Password reset successfully");
        setTimeout(()=>{
         
          dispatch(logout());
          navigate('/login');
        }, 3000)
        
        
      }
    }).catch(err => console.log(err))
}

const toggleType = () => {
  if( passType === "password"){
    setPassType('text');
  }else{
    setPassType('password');
  }
}

  return (
    <>
      <div className={styles.loginWrapper}>
        <img src="img/rings_3.png" alt="" className={styles.absImg} />
        <div className={styles.loginWrapper_left}>
          <p>wE’D LOVE YOU TO</p>
          <p>BECAME A PART OF OUR</p>
          <p>community </p>
        </div>
        <div className={styles.loginWrapper_right}>

{codeRecieve ? (
   <form onSubmit={changePass}>
   <h1>Recovery password</h1>

         <div className={styles.passwordBlock}>
       <input type="text" placeholder="Verification code from email" value={code}  onChange={(e)=>setCode(e.target.value)} />
       
     </div>

     <div className={styles.passwordBlock}>
       <input type={passType} placeholder="New password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
       <span className={styles.showPass} onClick={toggleType}>
       {(passType === "password") ? (<img src="/img/hide.svg" alt="" />) : (<img src="/img/show.svg" alt="" />)}
       </span>
     </div>
       <button type="submit" class={styles.accBtn} >
         Change password
     </button>
  

 </form>
) : 
(
  <form onSubmit={sendCode}>
  <h1>Recovery password</h1>

    <div className="registerInputBox">
    <input type="text" placeholder="User name or email adress" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
    </div>
  
  <div className={styles.formCheck} >
    Insert your email to recieve verification code 
  </div>
   <button type="submit" class={styles.accBtn} onClick={sendCode} >
    Send email
  </button>
</form>
)}

         


        </div>
      </div>
      <Runing />
    </>
  );
}
