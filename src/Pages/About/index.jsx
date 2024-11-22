import {useEffect, useState} from 'react';
import styles from "./About.module.scss";
import {Link} from "react-router-dom";
import Runing from "../../Components/Runing";
import { useTranslation  } from 'react-i18next';
import {Helmet} from "react-helmet";
import ShowMoreText from "react-show-more-text";
import axios from "axios";

export default function About() {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [seoText, setSeoText] = useState('');

  const { t, i18n } = useTranslation();

  const getApiCats = async() => {
    // console.log(id);
    await axios('https://api.sicvolo.org/wp-json/wp/v2/pages?per_page=100')
    .then(res =>{
      console.log(res);
      const data = res.data;
      console.log(data);
      const apiCat = data?.filter((obj) => obj.id === 1899);
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
          content_type: 'About page',
          content_ids: ['1234'],
          content_name: 'About page',
          content_category: 'About page',
         
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

     <div className={styles.about_1}>
      
        <div className={styles.about1_row}>
            <div className={styles.about1_row_breadcrumb}>
                <Link to={
                          (localStorage.getItem("lng") === 'en')
                          ? "/"
                          :
                          `/${localStorage.getItem("lng")}`
                          }
                >
                  Home page / </ Link>
                <span>{t("about us")}</span>
            </div>
            <p className={styles.about_title_1}>SIC VOLO -</p>
            <p className={styles.about_title_2}>{t("I want so")}</p>
            <img src="/img/ring_a.svg" className={styles.about_ring_1} alt="" />
            <p className={styles.text}>{t("abouText")}</p>
        </div>
        {/* <div className={styles.about_1_img}><img src="/img/about.jpg" alt="" /></div> */}
        <div className={styles.absImg}></div>
    </div>

     <div className={styles.about_2}>
        <img src="/img/about2.webp" alt="" className={styles.about_2_img1} />
     
        <div className={styles.about2_row}>
        <div className={styles.about2_row_wrapper}>
        <div className={styles.bigText}>{t("aboutBigText")} <img src="/img/ring_text2.png" className={styles.bigTextImg} alt="" /></div>
            <div className={styles.about_2_img2_mob}>
            </div>
            <div className={styles.about_text1}>
              <p>{t("ab1")}</p>
              <p>{t("ab2")} </p>
            </div>
            <div className={styles.about_text2}>
              {/* <p>that give our pieces a special charm and look even more spectacular over time.</p> */}
              <p>{t("ab3")}</p>
            </div>
        </div>
            
            
        </div>
       
    </div>


     <div className={styles.about_3}>
        <div className={styles.about_3_img1}>
          <img src="/img/about_logo.svg" className={styles.about_3_abs} alt="" />
          <p className={styles.about_3_text}>{t("ab4")}</p>
          {/* <img src="/img/about3.jpg" className={styles.about_3_sheap}  alt="" /> */}
        </div>
        <div className={styles.bgc}></div>
        <div className={styles.about3_row}>
          <div className={styles.about3_t1}>{t("ab5")}</div>
          <div className={styles.about3_title}>{t("ab6")}</div>
          <div className={styles.about3_t2}>{t("ab7")}</div>
          <div className={styles.about3_title}> {t("ab8")}</div>
             
        </div>
       
    </div>

    <Runing />
    </>
   
  )
}
