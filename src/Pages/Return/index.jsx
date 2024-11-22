import {useState} from 'react'
import styles from "./Return.module.scss"
import { useEffect } from 'react'
import { useTranslation  } from 'react-i18next';
import axios from "axios";
import {Helmet} from "react-helmet";

export default function Return() {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [seoText, setSeoText] = useState('');

  const getApiCats = async(id) => {
    console.log(id);
    await axios('https://api.sicvolo.org/wp-json/wp/v2/pages?per_page=100')
    .then(res =>{
      console.log(res);
      const data = res.data;
      console.log(data);
      const apiCat = data?.filter((obj) => obj.id === 1946);
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
    window.scrollTo(0, 0);
    if(window.fbq){
      window.fbq('track', 'ViewContent', { 
          content_type: 'Refund Policy page',
          content_ids: ['1234'],
          content_name: 'Refund Policy page',
          content_category: 'Refund Policy page',
         
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

        <div className={styles.policy_wrapper}>
      <h1>{t('q1')}</h1>
      <p className={styles.policy_wrapper}></p>


      <div className={styles.policy_item}>
        <div className={styles.policy_item_text}>
          <p>{t('q2')}</p>
          <ul>
    
            <li>{t('q3')}</li>
            <li>{t('q4')}</li>
            <li>{t('q5')}</li>
            <li>{t('q6')}</li>
            <li>{t('q7')}</li>
            <li>{t('q28')}</li>
            <li>{t('q8')}</li>
            <li>{t('q9')}</li>
            <li>{t('q10')}</li>
            <li>{t('q11')}</li>
            <li>{t('q12')} </li>
          </ul>
          <p>{t('q13')}</p>
          <p>{t('q14')} <a href='mailto:service@sicvolo.com'>service@sicvolo.com</a>.</p>

          <p>{t('q15')}</p>
          <p>{t('q16')}</p>
          <p>{t('q17')}</p>

            <p>{t('q18')}</p>
            <p style={{"color":"#fff"}}>{t('q19')}
              <br />
              {/* {t('q20')}<br />
              {t('q21')}<br />
              {t('q22')}<br />
              {t('q23')}<br />
              {t('q24')}<br />
              {t('q25')}<br />
              {t('q26')}<br />
              {t('q27')}<br /> */}
              {i18n.language !== "en" ? (<>Фізична особа-підприємець Березовський Олександр Володимирович <br/>Україна, 03083, місто Київ, вул. Кащенка Академіка, будинок 18 <br/>ІПН 2752620990 <br/> р/р UA053052990000026006006241666 в ПАТ КБ Приватбанк.  <br/>Платник єдиного податку 3 групи, БЕЗ ПДВ</>) : (<>Berezovskiy Oleksandr <br/>03083 Ukraine, Kyiv, Kaschenka Akademika str. 18 </>)    }          

            </p>
        </div>
      </div>

    </div>
    
        </>
    
  )
}
