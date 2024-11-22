import {useEffect, useState} from 'react'
import styles from "./Faq.module.scss"
import Accordion from '../../Components/Accordion'
import { useTranslation  } from 'react-i18next'
import axios from "axios";
import {Helmet} from "react-helmet";
import ShowMoreText from "react-show-more-text";



export default function Faq() {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [seoText, setSeoText] = useState('');

  const getApiCats = async() => {
  
    await axios('https://api.sicvolo.org/wp-json/wp/v2/pages?per_page=100')
    .then(res =>{
      console.log(res);
      const data = res.data;
      console.log(data);
      const apiCat = data?.filter((obj) => obj.id === 1903);
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
          content_type: 'FAQ page',
          content_ids: ['1234'],
          content_name: 'FAQ page',
          content_category: 'FAQ page',
         
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
         <div className={styles.faqWrapper_title}> <h2>{t('FREQUENTLY ASKED QUESTIONS')}</h2></div>
         <div className={styles.faqWrapper}>
        {/* <img src="img/faqFon.svg" alt="" className={styles.faqFon} /> */}
   
       
        <div className={styles.left}>
            <img src="/img/faq.webp" alt="Sicvolo - FAQ image" />
            <img src="/img/faqRound.svg" className={styles.faqRound} alt="" />
        </div>
        <div className={styles.right}>
            <Accordion 
            title={t('ask1')}
            content={t('answ1')}  />
            <Accordion 
            title={t('ask2')}
            content={t('answ2')}  />
            <Accordion 
            title={t('ask3')}
            content={t('answ3')}  />
            <Accordion 
            title={t('ask4')}
            content={t('answ4')} />
            <Accordion 
            title={t('ask5')}
            content={t('answ5')} />
            <Accordion 
            title={t('ask7')}
            content={t('answ7')}  />
            <Accordion 
            title={t('ask8')}
            content={t('answ8')}  />
            <Accordion 
            title={t('ask9')}
            content={t('answ9')} />
            <Accordion 
            title={t('ask10')}
            content={t('answ10')}  />
            <Accordion 
            title={t('ask11')}
            content={t('answ11')}  />
            <Accordion 
            title={t('ask12')}
            content={t('answ12')}  />
            <Accordion 
            title={t('ask13')}
            content={t('answ13')}  />
            <Accordion 
            title={t('ask14')}
            content={t('answ14')} />
            <Accordion 
            title={t('ask15')}
            content={t('answ15')}  />
            <Accordion 
            title={t('ask16')}
            content={t('answ16')}  />
            <Accordion 
            title={t('ask17')}
            content={t('answ17')}  />
            <Accordion 
            title={t('ask18')}
            content={t('answ18')}  />
        </div>
      
    </div>
         </>
   
  )
}
