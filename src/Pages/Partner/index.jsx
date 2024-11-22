import {useState, useEffect} from 'react';
import styles from "./Partner.module.scss";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useTranslation, withTranslation } from 'react-i18next';
import {Helmet} from "react-helmet";
import ShowMoreText from "react-show-more-text";

export default function Partner() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [nick, setNick] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [seoText, setSeoText] = useState('');

  const contactHandler = async(e) => {
    e.preventDefault();
    const params = {name, phone, email, nick};
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/mail/sendMailPartner`, params);
      
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
      const apiCat = data?.filter((obj) => obj.id === 1901);
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
          content_type: 'Partner page',
          content_ids: ['1234'],
          content_name: 'Partner page',
          content_category: 'Partner page',
         
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
            {/* <div className={styles.about1_row_breadcrumb}>
                <Link to="/">Home page / </ Link>
                <span>Partnership</span>
            </div> */}
            <p className={styles.about_title_1}>Collaborate </p>
            <p className={styles.about_title_2}>with Sic Volo</p>
            <img src="/img/ring_a.svg" className={styles.about_ring_1} alt="" />
            <p className={styles.text}>Welcome to the Partnership Page of Sic Volo, a leading manufacturer of luxury premium accessories crafted from exquisite materials. We are delighted to explore partnership opportunities with influential individuals who share our passion for sophistication, elegance, and exceptional craftsmanship. Join us on this exciting journey and become a valued collaborator.</p>
        </div>
        <div className={styles.mobFon}></div>
    </div>




     <div className={styles.about_2}>
      
        <div className={styles.about2_row}>
          <img src="img/greLogoLetter.svg" className={styles.letterLogo} alt="" />
          <h2>Why Partner with Sic Volo?</h2>
          <div className={styles.about2_row_col_4}>
            <p>Luxury Prestige</p>
            As a distinguished brand, Sic Volo epitomizes luxury, offering premium accessories made from precious materials such as silver, gold, and alligator leather. Partnering with us allows you to align yourself with a brand renowned for its exclusivity and superior quality.
          </div>
          <div className={styles.about2_row_col_4}>
            <p>Captivating Design</p>
            Our accessories showcase timeless and captivating designs that resonate with individuals who appreciate refined aesthetics and distinctive style. By partnering with Sic Volo, you can introduce your audience to our exquisite creations that exude elegance and sophistication.
          </div>
        </div>


        {/* <div className={styles.about2_row}>
          <div className={styles.about2_row_col_8}>
            <img src="/img/ship2.jpg" alt="" className={styles.about2_center_img} />
            <img className={styles.about_2_img1} src="/img/vs.png" alt="" />
            <img className={styles.about_2_img2} src="/img/vs.png" alt="" />
          </div>
          
        </div> */}

        <div className={styles.about2_row}>
        {/* <div className={styles.about2_row_col_4}></div> */}
          <div className={styles.about2_row_col_4}>
            <p>Craftsmanship and Quality</p>
            Each Sic Volo accessory is meticulously handcrafted by skilled artisans, ensuring unparalleled attention to detail and exceptional quality. Collaborating with us allows you to present your audience with products of remarkable craftsmanship and enduring beauty.
          </div>
          <div className={styles.about2_row_col_4}>
            <p>Influencer Benefits</p>
            As a valued partner, you can enjoy numerous benefits, including exclusive discounts on our products, early access to new releases, personalized collaborations, and opportunities to feature in our promotional campaigns. We value our partnerships and strive to create mutually beneficial relationships.
          </div>
        </div>
       

       
    </div>


    <div className={styles.about_3_how}>
        <div className={styles.about2_row}>
          <h2>How to Partner with Sic Volo:</h2>
          <div className={styles.howPartnerItem}>
            <div className={styles.howPartnerItem_left}>
              <span>Step 1</span>
              <p>Reach out to us</p>
            </div>
            <div className={styles.howPartnerItem_right}>We welcome influencers with a genuine passion for luxury accessories to contact us through our partnership inquiry form or by any means convenient for you. Share your details, including your social media channels, audience demographics, and any relevant collaboration ideas.</div>
          </div>

          <div className={styles.howPartnerItem}>
            <div className={styles.howPartnerItem_left}>
              <span>Step 2</span>
              <p>Collaboration Proposal:</p>
            </div>
            <div className={styles.howPartnerItem_right}>We encourage you to present your partnership proposal, including your vision for collaboration, content creation ideas, and how you believe our brands can align synergistically. We value creativity and innovative concepts that resonate with our target audience.</div>
          </div>

          <div className={styles.howPartnerItem}>
            <div className={styles.howPartnerItem_left}>
              <span>Step 3</span>
              <p>Evaluation and Selection:</p>
            </div>
            <div className={styles.howPartnerItem_right}>Our team will carefully evaluate each partnership proposal based on factors such as alignment with our brand values, audience fit, engagement metrics, and overall collaboration potential. We will reach out to selected influencers for further discussions.</div>
          </div>

          <div className={styles.howPartnerItem}>
            <div className={styles.howPartnerItem_left}>
              <span>Step 4</span>
              <p>Collaboration Execution:</p>
            </div>
            <div className={styles.howPartnerItem_right}>Once the partnership is confirmed, we will work closely with you to define the collaboration details, including content creation guidelines, product selection, timelines, and promotion strategies. Our aim is to ensure a seamless and successful collaboration experience.</div>
          </div>

        </div>
       
    </div>

     <div className={styles.about_3}>
       
        
        <div className={styles.about3_row}>
          <div className={styles.about3_row_left}>
            <p>If you are an influencer with a dedicated following and a passion for luxurious accessories</p>
            <h3>we invite you to join us in celebrating the art of craftsmanship and elegance. </h3>
            <form onSubmit={contactHandler}>
              <p>Partner with Sic Volo and let's create extraordinary experiences for our audiences, elevating luxury to new heights. Contact us today to begin this exciting journey of collaboration.</p>
              <img src="/img/collaborate.png" alt="" />
              <input type="text" placeholder='Enter your mobile phone' onChange={(e)=>setPhone(e.target.value)} value={phone} required/>
              <input type="text" placeholder='Instagram nickname ' onChange={(e)=>setNick(e.target.value)} value={nick} required/>
              <input type="text" placeholder='Enter your first and last name' onChange={(e)=>setName(e.target.value)} value={name} required />
              <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
              <button type="submit">Let’s collaborate!</button>
            </form>
          </div>
          <div className={styles.about3_row_right}><img src="/img/collaborate.png" alt="" /></div>
             
        </div>
       
    </div>

 
    </>
   
  )
}
