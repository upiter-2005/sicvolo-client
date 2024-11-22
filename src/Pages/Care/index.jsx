import {useEffect, useState} from 'react'
import styles from "./Care.module.scss"
import ReactPixel from 'react-facebook-pixel';
import axios from "axios";
import { useTranslation, withTranslation } from 'react-i18next';
import {Helmet} from "react-helmet";
import ShowMoreText from "react-show-more-text";

export default function Care() {
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
      const apiCat = data?.filter((obj) => obj.id === 1938);
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
            content_type: 'Care page',
            content_ids: ['1234'],
            content_name: 'Care page',
            content_category: 'Care page',
           
          })
        window.fbq('track', 'PageView')
    }  
    }, [])


  return (<>
  <Helmet>
        <link rel="canonical" href={`https://sicvolo.com${window.location.pathname}`} />
            <title>{title}</title> 
            <meta name="description" content={descr} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content="https://sicvolo.com/img/sl2.png" />
            <meta property="og:description" content={descr} />
        </Helmet>


        <div className={styles.policy_wrapper}>
      <h1 >CARE</h1>
      <p className={styles.policy_wrapper}>Caring for Your Leather Belts with Precious Metal Buckles</p>
      
      <p className={styles.policy_wrapperLast}>At SIC VOLO, we take pride in offering luxurious leather belts with exquisite precious metal buckles. To ensure that your purchase remains in impeccable condition, follow these care guidelines to preserve the beauty and longevity of your belt:</p>


      <div className={styles.policy_item}>
        <span className={styles.policy_item_num}>1 <img src="img/care-ring.svg" alt="" /></span>
        <p className={styles.policy_item_title}>Regular Cleaning</p>
        <div className={styles.policy_item_text}>
            <p>Gently wipe the surface of your leather belt with a soft, dry cloth to remove dust and debris. For tougher stains, use a slightly damp cloth and then pat dry.</p>
        </div>
      </div>

      <div className={styles.policy_item}>
        <span className={styles.policy_item_num}>2 <img src="img/care-ring.svg" alt="" /></span>
        <p className={styles.policy_item_title}>Avoid Moisture</p>
        <div className={styles.policy_item_text}>
            <p>Leather is sensitive to moisture, so avoid exposing your belt to water or excessive humidity. If your belt does get wet, gently blot it with a dry cloth and allow it to air dry naturally</p>
        </div>
      </div>

      <div className={styles.policy_item}>
        <span className={styles.policy_item_num}>3 <img src="img/care-ring.svg" alt="" /></span>
        <p className={styles.policy_item_title}>Keep Away from Direct Sunlight and Heat</p>
        <div className={styles.policy_item_text}>
            <p>Store your leather belt in a cool, dry place away from direct sunlight, heat sources, and extreme temperature fluctuations. Prolonged exposure to these elements can cause the leather to dry out, crack, or fade</p>
        </div>
      </div>

      <div className={styles.policy_item}>
        <span className={styles.policy_item_num}>4 <img src="img/care-ring.svg" alt="" /></span>
        <p className={styles.policy_item_title}>Use a Soft Brush</p>
        <div className={styles.policy_item_text}>
            <p>For textured exotic leather, use a soft brush to remove dirt from the crevices. Brush gently in the direction of the scales to maintain the appearance of the leather</p>
        </div>
      </div>

      <div className={styles.policy_item}>
        <span className={styles.policy_item_num}>5 <img src="img/care-ring.svg" alt="" /></span>
        <p className={styles.policy_item_title}>Leather Conditioning</p>
        <div className={styles.policy_item_text}>
            <p>To maintain the suppleness of the exotic leather, apply a high-quality leather conditioner recommended for exotic leathers. Follow the product instructions and test it on a small, inconspicuous area before applying it to the entire belt</p>
        </div>
      </div>

      <div className={styles.policy_item}>
        <span className={styles.policy_item_num}>6 <img src="img/care-ring.svg" alt="" /></span>
        <p className={styles.policy_item_title}>Protect Metal Buckles</p>
        <div className={styles.policy_item_text}>
            <p>Wipe you precious metal buckles with a soft cloth to remove fingerprints and dirt. Use a gentle metal cleaner if needed, but avoid any abrasive materials that could scratch the metal's surface</p>
        </div>
      </div>

      <div className={styles.policy_item}>
        <span className={styles.policy_item_num}>7 <img src="img/care-ring.svg" alt="" /></span>
        <p className={styles.policy_item_title}>Avoid Friction</p>
        <div className={styles.policy_item_text}>
            <p>To prevent excessive wear, avoid rubbing your leather belt against rough or abrasive surfaces. Store it away from other items that could potentially cause friction or scratches</p>
        </div>
      </div>

      <div className={styles.policy_item}>
        <span className={styles.policy_item_num}>8 <img src="img/care-ring.svg" alt="" /></span>
        <p className={styles.policy_item_title}>Store Properly</p>
        <div className={styles.policy_item_text}>
            <p>When not in use, store your belt in a dust bag or a dedicated belt hanger to protect it from dust and direct contact with other items</p>
        </div>
      </div>

      <div className={styles.policy_item}>
        <span className={styles.policy_item_num}>9 <img src="img/care-ring.svg" alt="" /></span>
        <p className={styles.policy_item_title}>Professional Care</p>
        <div className={styles.policy_item_text}>
            <p>If your belt requires deep cleaning, conditioning, or restoration, consider seeking the assistance of a professional leather care specialist who has experience with exotic leathers</p>
        </div>
      </div>

      <div className={styles.policy_item}>
        <span className={styles.policy_item_num}>10 <img src="img/care-ring.svg" alt="" /></span>
        <p className={styles.policy_item_title}>Rotate Usage</p>
        <div className={styles.policy_item_text}>
            <p>To prevent overuse, rotate your belts in your wardrobe to evenly distribute wear and maintain their longevity</p>
        </div>
      </div>


      <p className={styles.policy_wrapper_bottom}> By following these care instructions, you can enjoy your exotic leather belt with precious metal buckles for years to come. If you have any further questions or concerns about caring for your belt, please don't hesitate to contact our Customer Support team at <a href="mailto:service@sicvolo.com">service@sicvolo.com</a> .</p>


    </div>


  </>
   
  )
}
