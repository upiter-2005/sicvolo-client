import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from "react-router-dom"
import { setAditionalDataUser} from "../../redux/slices/userSlice";
import { toast } from 'react-toastify';
import axios from "axios";
import {Link} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

import styles from "./Profile.module.scss";

export default function Profile() {
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

    useEffect(()=>{
      //localStorage.getItem("token");
      setName(localStorage.getItem("userName"));
      setPhone(localStorage.getItem("userPhone"));
      setLastName(localStorage.getItem("userLastName"));
      setEmail(localStorage.getItem("userEmail"));

    }, [user])

    useEffect(()=>{
      if(localStorage.getItem("token")) {
        return;
      }else{navigate('/login');}
    }, [])

    const updateUser = async() => {
      const data = {
        "acf": {
          "user_phone" : phone,
          "user_last_name": lastName,
          "user_first_name": name,
        }
      };
      axios.post(`https://api.sicvolo.org/wp-json/wp/v2/users/${localStorage.getItem('userId')}`, data, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      ).then(res => {
          console.log(res);
          toast("User info was updated!");
          localStorage.setItem("userName", name );
          localStorage.setItem("userPhone", phone);
          localStorage.setItem("userLastName", lastName);
          localStorage.setItem("userEmail", email);

          dispatch(setAditionalDataUser(
            {
              user_phone: phone,
              user_last_name: lastName,
              id: res.data.id
            }
          ));

        }).catch(err => console.log(err))
      
    }

  return (
    <div className={styles.profile}>
        <h2>Profile</h2>
        <div className={styles.profile_item}>
            <input type="text" 
            value={name} 
            onChange={(e)=>setName(e.target.value)}
            placeholder='Enter your first name' 
            />
        </div>
        <div className={styles.profile_item}>
            <input type="text" value={lastName} 
            onChange={(e)=>setLastName(e.target.value)} 
            placeholder="Enter your last name"  />
        </div>
        <div className={styles.profile_item}>
          <button><img src="/img/edit.svg" alt="edit" /> Phone</button>
           <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className={styles.pureInput} />
        </div>
        <div className={styles.profile_item}>
          <button><img src="/img/edit.svg" alt="edit" /> Email</button>
           <input type="text" value={email} className={styles.pureInput} />
        </div>
        <div className={styles.profile_item}>
          <button><img src="/img/edit.svg" alt="edit" /> <Link to="/recovery">Change password</Link></button>
           
        </div>
        <button className={styles.saveBtn} onClick={updateUser}>Save changes</button>
    </div>
  )
}
