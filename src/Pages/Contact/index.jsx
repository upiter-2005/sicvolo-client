import {useState, useEffect} from "react";
import axios from "axios";
import Runing from "../../Components/Runing";
import { useNavigate } from "react-router-dom";
import styles from "./Contact.module.scss";
import { useTranslation  } from 'react-i18next';
import {Helmet} from "react-helmet";
import ShowMoreText from "react-show-more-text";

export default function Contact() {

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [seoText, setSeoText] = useState('');
  

  const contactHandler = async(e) => {
    e.preventDefault();
    const params = {name, phone, email, comment};
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/mail/sendMail`, params);
    
      if(data.status === 200){
        navigate('/thank');
      }
      return data;
    } catch (e) {
      console.log(e.message);
    }

  }
  const getApiCats = async(id) => {
    console.log(id);
    await axios('https://api.sicvolo.org/wp-json/wp/v2/pages?per_page=100')
    .then(res =>{
      console.log(res);
      const data = res.data;
      console.log(data);
      const apiCat = data?.filter((obj) => obj.id === 1897);
      console.log(apiCat);

      if(i18n.language === "en"){
        setTitle(apiCat[0].acf.title_en);
        setDescr(apiCat[0].acf.description_en);
        setSeoText(apiCat[0].acf.seo_text_en);
      }
      if(i18n.language === "sp"){
        setTitle(apiCat[0].acf.title_sp);
        setDescr(apiCat[0].acf.description_sp);
        setSeoText(apiCat[0].acf.seo_text_sp);
      }
      if(i18n.language === "fr"){
        setTitle(apiCat[0].acf.title_fr);
        setDescr(apiCat[0].acf.description_fr);
        setSeoText(apiCat[0].acf.seo_text_fr);
      }
      if(i18n.language === "it"){
        setTitle(apiCat[0].acf.title_it);
        setDescr(apiCat[0].acf.description_it);
        setSeoText(apiCat[0].acf.seo_text_it);
      }
      if(i18n.language === "ua"){
        setTitle(apiCat[0].acf.title_ua);
        setDescr(apiCat[0].acf.description_ua);
        setSeoText(apiCat[0].acf.seo_text_ua);
      }
      if(i18n.language === "ru"){
        setTitle(apiCat[0].acf.title_ru);
        setDescr(apiCat[0].acf.description_ru);
        setSeoText(apiCat[0].acf.seo_text_ru);
      }
       
    } )
   
  }
  useEffect(()=>{
    getApiCats();
    if(window.fbq){
      window.fbq('track', 'ViewContent', { 
          content_type: 'Contact page',
          content_ids: ['1234'],
          content_name: 'Contact page',
          content_category: 'Contact page',
         
        })
      window.fbq('track', 'PageView')
    } 
  }, [])
  return (
    <>
    <Helmet>
        <link rel="canonical" href={`https://sicvolo.com${window.location.pathname}`} />
            <title>{title}</title> 
            <meta name="description" content={descr} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content="https://sicvolo.com/img/sl2.png" />
            <meta property="og:description" content={descr} />
        </Helmet>

      <div className={styles.contactWrapper}>
        <div className="row align-items-start">
          <div className={styles.contactWrapper_left}>
            <p>{t('Lets')}</p>
            <p>{t('grt in')}</p>
            <p>{t('TOUCH')}</p>
            <img src="img/ring_g.png" alt="" />
          </div>
          <div className={styles.contactWrapper_right}>
            <p className={styles.contactWrapper_title}>{t('Customer Care')}:</p>
            <div className={styles.contactWrapper_contacts}>
              <div className={styles.contact_item}>
                <span>{t('Message us')}:</span>
                <a href="#" onClick={()=> window.fbq('track', 'Contact')}>
                  <img src="img/tg-r.svg" alt="" />
                </a>
                <a href="#" onClick={()=> window.fbq('track', 'Contact')}>
                  <img src="img/wh-r.svg" alt="" />
                </a>
                <a href="#" onClick={()=> window.fbq('track', 'Contact')}>
                  <img src="img/viber-r.svg" alt="" />
                </a>
                <p>
                  <a href="tel:+380674445262 " onClick={()=> window.fbq('track', 'Contact')}>+380 (67) 444 52 62 </a>
                </p>
              </div>

              <div className={styles.contact_item}>
                <span>{t('E-mail us')}:</span>
                <p>
                  <a href="mailto:info@sicvolo.com" onClick={()=> window.fbq('track', 'Contact')}>info@sicvolo.com</a>
                </p>
              </div>
            </div>

            <p className={styles.contactWrapper_title}>{t('contact us')}</p>
            <form onSubmit={contactHandler}>
              <div className={styles.input_50}>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder={t('Enter your name')} required />
              </div>
              <div className={styles.input_50}>
                <input type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder={t('Enter your mobile phone')} required />
              </div>
              <div className={styles.input_100}>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={t('Email')} required />
              </div>
              <div className={styles.input_100}>
                <textarea placeholder={t('Your Question')} onChange={(e)=>setComment(e.target.value)} value={comment}></textarea>
              </div>
              <div className={styles.submit_wrap}>
                <button className={styles.submitBtn}>
                  <img src="img/submit.svg" alt="" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Runing />

      <ShowMoreText
                /* Default options */
                lines={4}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="show-more-less-clickable"
                //onClick={this.executeOnClick}
                expanded={false}
                truncatedEndingComponent={"... "}
            >
              <div dangerouslySetInnerHTML={{ __html: seoText }} />
            </ShowMoreText>

    </>
  );
}
