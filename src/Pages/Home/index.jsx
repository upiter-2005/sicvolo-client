import { useState, useEffect, useRef } from "react";
import {Link, useNavigate} from "react-router-dom"
import Runing from "../../Components/Runing";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../Components/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {getFeatureProducts} from "../../redux/slices/productsSlice";
import styles from "./Home.module.scss";
import  HomeNavMain from "../../Components/HomeNavMain"
import  Soon from "../../Pages/Soon"
import axios from "axios";
import { useTranslation, withTranslation } from 'react-i18next';
import {Helmet} from "react-helmet";
import ShowMoreText from "react-show-more-text";


 function  Home() {
  const { t, i18n } = useTranslation();
  const vidRef = useRef();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [seoText, setSeoText] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const featureItems = useSelector(state=>state.products.featureItems);
  const images = ["../../public/img/sl1.jpeg"];
  const [imageIndex, setImageIndex] = useState(0);
  const [sliderItems, setSliderItems] = useState([]);
  const [url, setUrl] = useState('');

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <img src="img/rightAr.svg" alt="" />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <img src="img/leftAr.svg" alt="" />
      </div>
    );
  };
  const settings = {
    className: "banerSliderMain",
    infinite: true,
    lazyLoad: true,
    speed: 1200,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    centralMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  const settingsNew = {
    infinite: true,
    lazyLoad: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centralMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      },
      
    ],
    beforeChange: (current, next) => setImageIndex(next),
  };

  
  const getApiCats = async() => {
   
    await axios('https://api.sicvolo.org/wp-json/wp/v2/pages?per_page=100')
    .then(res =>{
      console.log(res);
      const data = res.data;
      console.log(data);
      const apiCat = data?.filter((obj) => obj.id === 1895);
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
    dispatch(getFeatureProducts());
    setUrl(window.location.pathname);
    if(window.fbq){
      window.fbq('track', 'ViewContent', { 
          content_type: 'Home page',
          content_ids: ['1234'],
          content_name: 'Home page',
          content_category: 'Home page',
         
        })
      window.fbq('track', 'PageView')
    } 
    
   
  }, [])
 
  useEffect(()=>{
    if(vidRef !== undefined){
      //vidRef.current.play();
    }
    
  }, [vidRef])
  useEffect(()=>{
    setSliderItems(featureItems)
  }, [featureItems])


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



  return (
    <div>
        <Helmet>
        <link rel="canonical" href={`https://sicvolo.com${window.location.pathname}`} />
            <title>{title}</title> 
            <meta name="description" content={descr} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content="https://sicvolo.com/img/sl2.png" />
            <meta property="og:description" content={descr} />
        </Helmet>
      <div className={styles.mainBanerSlider}>
      <HomeNavMain /> 
        <Slider {...settings}>
          {/* <div className="slide">
            <video 
                ref={vidRef}
                playsInline="true"
                preLoad="auto" // provides autoplay in slider
                className={styles.videoBlock}
                autoPlay="true"
                muted
                poster="img/sl1.jpeg"
              width="100%"
              height="100%"
            >
              <source type="video/webm" src="/img/sl1.webm" />
              <source type="video/mp4" src="/img/sl1.mp4" />
              </video>

          </div> */}

          <div className="slide">
            <div className="slide-data">
              <img src="img/logo.svg" className="slide-logo" alt="" />
              <p>Get your fire on</p>
            </div>
            <img src="/img/sl1.webp" alt="" className="banerImg" />
            <img src="/img/m1.webp" alt="" className="mobBanerImg" />
          </div>
          <div className="slide">
            <div className="slide-data">
              <img src="img/logo.svg" className="slide-logo" alt="" />
              <p>Be bold Be you</p>
            </div>
            <img src="img/sl2.webp" alt="" className="banerImg" />
            <img src="img/m2.webp" alt="" className="mobBanerImg" />
          </div>
          <div className="slide">
            <div className="slide-data">
              <img src="img/logo.svg" className="slide-logo" alt="" />
              <p>Feel the spark</p>
            </div>
            <img src="img/sl3.webp" alt="" className="banerImg" />
             <img src="img/m3.webp" alt="" className="mobBanerImg" />
          </div>
          <div className="slide">
            <div className="slide-data">
              <img src="img/logo.svg" className="slide-logo" alt="" />
              <p>Break the mold</p>
            </div>
            <img src="img/sl4.webp" alt="" className="banerImg" />
             <img src="img/m4.webp" alt="" className="mobBanerImg" />
          </div>
          {/* <div className="slide">
            <div className="slide-data">
              <img src="img/logo.svg" className="slide-logo" alt="" />
              <p>It's time to shine</p>
            </div>
            <img src="img/sl5.png" alt="" className="banerImg" />
             <img src="img/m5.jpg" alt="" className="mobBanerImg" />
          </div> */}
          <div className="slide">
            <div className="slide-data">
              <img src="img/logo.svg" className="slide-logo" alt="" />
              <p>Break the mold</p>
            </div>
            <img src="img/sl6.webp" alt="" className="banerImg" />
             <img src="img/m6.webp" alt="" className="mobBanerImg" />
          </div>
          <div className="slide">
            <div className="slide-data">
              <img src="img/logo.svg" className="slide-logo" alt="" />
              <p>Do something different</p>
            </div>
            <img src="img/sl7.webp" alt="" className="banerImg" />
             <img src="img/m7.webp" alt="" className="mobBanerImg" />
          </div>
          <div className="slide">
            <div className="slide-data">
              <img src="img/logo.svg" className="slide-logo" alt="" />
              <p>Get your fire on</p>
            </div>
            <img src="img/sl8.webp" alt="" className="banerImg" />
             <img src="img/m8.webp" alt="" className="mobBanerImg" />
          </div>

      
        </Slider>
        <div className={styles.mainBanerSlider_center}>

          {/* <img src="img/logo_letter.svg" alt="" />
          <p>{t("Be unique like a masterpiece")}</p> */}
          {/* <img src="img/ring_g.png" className={styles.absRing} alt="" /> */}
        </div>
      </div>

      <div className={styles.categories_home}>
        <div className="container">
          <div className="row">
            <Link to={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/belts"
           :
           `/${localStorage.getItem("lng")}/catalog/belts`
          } className={styles.item}>
              <img src="/img/ring_g.png" alt="" className={styles.greenRing} />
              <img src="/img/ring_b.png" alt="" className={styles.blackRing} />
              <img src="/img/it1.webp" alt="" className={styles.item_img} />
              <p>{t("belts")}</p>
              <Link to={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/belts"
           :
           `/${localStorage.getItem("lng")}/catalog/belts`
          }>
              {t("Show me")} <img src="/img/carret-r.png" alt="" />
              </Link>
            </Link>
             <Link to={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/rings"
           :
           `/${localStorage.getItem("lng")}/catalog/rings`
          }  className={styles.item}>
              <img src="/img/ring_g.png" alt="" className={styles.greenRing} />
              <img src="/img/ring_b.png" alt="" className={styles.blackRing} />
              <img src="/img/it2.webp" alt="" className={styles.item_img} />
              <p>{t("jewelry")}</p>
              <Link to={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/rings"
           :
           `/${localStorage.getItem("lng")}/catalog/rings`
          }>
              {t("Show me")} <img src="/img/carret-r.png" alt="" />
              </Link>
            </Link>
            <Link to={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/accessories"
           :
           `/${localStorage.getItem("lng")}/catalog/accessories`
          } className={styles.item}>
              <img src="img/ring_g.png" alt="" className={styles.greenRing} />
              <img src="img/ring_b.png" alt="" className={styles.blackRing} />
              <img src="img/it3.png" alt="" className={styles.item_img} />
              <p>{t("accessories")}</p>
              <Link to={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/accessories"
           :
           `/${localStorage.getItem("lng")}/catalog/accessories`
          }>
              {t("Show me")} <img src="/img/carret-r.png" alt="" />
              </Link>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.home_light}>
        {/* <img src="img/ring_w.svg" alt="" className={styles.home_light_ring} />
        <img src="img/l1.jpeg" alt="" className={styles.home_light_leftImg} />
        <img src="img/l2.jpg" alt="" className={styles.home_light_rightImg} /> */}
        <div className={`${styles.light_descr} `}>
          <div className={styles.home_light_inner}>
            <h1 className={styles.scvSpan}>Sic Volo</h1> 
            {t("ADDS ELEMENTS OF ART TO PEOPLE'S DAILY LIVES. EACH OF OUR WORKS IS A MASTERPIECE")} 
            <span> {t("HANDCRAFTED BY A MASTER,")} </span> 
            {t("HANDCRAFTED BY A MASTER, WITH ITS OWN MEANING AND STYLE. PRECIOUS MATERIALS USED IN OUR WORKS ADD A SPECIAL")}
          </div>
          <div className={styles.bullets}>
            <span>{t("ENERGY OF UNIQUENESS")}, </span> 
            <span>{t("LUXURY")}, </span><span>{t("INFINITY")}</span>
            
            
          </div>
          {/* <p className={styles.t1}></p>
          <p className={styles.t2}></p>
          <p className={styles.t3}></p> */}
        </div>
      </div>

      <div className={styles.newProducts}>
        <h2>{t("NEW EXCLUSIVES")}</h2>
        <div className="newProduct_slider">
          <Slider {...settingsNew}>
            {sliderItems?.map((obj, i)=>  <ProductCard isCentered={true}  name={obj.name} img={obj.images[0]?.src} price={obj.price} link={obj.slug} key={i} meta={obj.meta_data} /> )}
 
          </Slider>
        </div>
      </div>

      <div className={styles.individual}>
        <h2>{t("INDIVIDUAL DESIGN")}</h2>
        <p>{t("Our designers can develop any design and customize any item for you using precious materials. Anything you wish!")}
        </p>
        <form onSubmit={contactHandler}>
          <div>
            <input type="text" value={name} name="name" onChange={(e)=>setName(e.target.value)} placeholder={t("Enter your first name")} required/>
          </div>
          <div>
            <input type="text" value={phone} name="phone" onChange={(e)=>setPhone(e.target.value)} placeholder={t("Enter your mobile phone")} required/>
          </div>
         
          <div className={styles.inputBox_100}>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={t("Email")} required />
          </div>
          <div className={styles.inputBox_100}>
                <textarea placeholder="Your question " onChange={(e)=>setComment(e.target.value)} value={t("Your Question")}></textarea>
              </div>
          <button type="submit">{t("Send a request")}</button>
        </form>
        <div className={styles.individual_stripe}>
          <img src="img/b8.png" alt="" />
          <img src="img/b1.png" alt="" />
          <img src="img/b5.png" alt="" />
          <img src="img/b2.png" alt="" />
          <img src="img/b6.png" alt="" />
          <img src="img/b3.png" alt="" />
          <img src="img/b7.png" alt="" />
          <img src="img/b4.png" alt="" />


           <img src="img/b8.png" alt="" />
          <img src="img/b1.png" alt="" />
          <img src="img/b5.png" alt="" />
          <img src="img/b2.png" alt="" />
          <img src="img/b6.png" alt="" />
          <img src="img/b3.png" alt="" />
          <img src="img/b7.png" alt="" />
          <img src="img/b4.png" alt="" />
        </div>
      </div>

      <div className={styles.cat_stripe}>
        <div style={{ backgroundImage: "url(/img/bgs1.webp)" }} className={styles.cat_stripe_item}>
          <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/haute-skull-couture"
           :
           `/${localStorage.getItem("lng")}/catalog/haute-skull-couture`
          }>{t("HAUTE SKULL COUTURE")}</a>
        </div>
        <div style={{ backgroundImage: "url(/img/bgs2.webp)" }} className={styles.cat_stripe_item}>
          <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/nautical-treasures"
           :
           `/${localStorage.getItem("lng")}/catalog/nautical-treasures`
          }>{t("NAUTICAL TREASURES")}</a>
        </div>
        <div style={{ backgroundImage: "url(/img/bgs3.webp)" }} className={styles.cat_stripe_item}>
          <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/majestic-wildlife"
           :
           `/${localStorage.getItem("lng")}/catalog/majestic-wildlife`
          }>{t("MAJESTIC WILDLIFE")}</a>
        </div>
        <div style={{ backgroundImage: "url(/img/bgs4.webp)" }} className={styles.cat_stripe_item}>
          <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/blossom-symphony"
           :
           `/${localStorage.getItem("lng")}/catalog/blossom-symphony`
          }>{t("BLOSSOM SYMPHONY")}</a>
        </div>
        <div style={{ backgroundImage: "url(/img/bgs5.webp)" }} className={styles.cat_stripe_item}>
          <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/for-him"
           :
           `/${localStorage.getItem("lng")}/catalog/for-him`
          }>{t("FOR HIM")}</a>
        </div>
        <div style={{ backgroundImage: "url(/img/bgs6.webp)" }} className={styles.cat_stripe_item}>
          <a href={
          (localStorage.getItem("lng") === 'en')
          ? "/catalog/for-her"
           :
           `/${localStorage.getItem("lng")}/catalog/for-her`
          }>{t("FOR HER")}</a>
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
    </div>
  );
}

export default withTranslation()(Home);
