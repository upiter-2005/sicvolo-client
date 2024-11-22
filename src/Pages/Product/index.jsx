import axios from "axios"
import parse from 'html-react-parser'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select'
import Slider from "react-slick";
import BeltSizeModal from "../../Components/BeltSizeModal"
import Carousel from "../../Components/Carousel"
import RingSizeModal from "../../Components/RingSizeModal"
import ProductCard from "../../Components/ProductCard"
import Runing from "../../Components/Runing"
import Timer from "../../Components/Timer"
import Convert from "../../Components/Convert"
import { addToCart, showCard } from "../../redux/slices/cardSlice"
import { clearActiveCats, getProducts } from "../../redux/slices/productsSlice"
import styles from "./Product.module.scss"


const NextArrow = ({ onClick }) => {
   

    return (
      <div className="arrow next" onClick={onClick}>
        <img src="/img/rightAr.svg" alt="" />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <img src="/img/leftAr.svg" alt="" />
      </div>
    );
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
  //  beforeChange: (current, next) => setImageIndex(next),
  };


const beltSizes = [65,70, 75, 80, 85, 90, 95, 100, 105, 110, 115];
const optionsRings = [
    { value: 18.15, label: "18.15 mm" },
    { value: 18.79, label: "18.79 mm" },
    { value: 19.11, label: "19.11 mm" },
    { value: 19.43, label: "19.43 mm" },
    { value: 19.75, label: "19.75 mm" },
    { value: 20.06, label: "20.06 mm" },
    { value: 20.38, label: "20.38 mm" },
    { value: 20.70, label: "20.70 mm" },
    { value: 21.02, label: "21.02 mm" },
    { value: 21.34, label: "21.34 mm" },
    { value: 21.66, label: "21.66 mm" },
    { value: 21.97, label: "21.97 mm" },
    { value: 22.29, label: "22.29 mm" },
    { value: 22.61, label: "22.61 mm" },
    { value: 22.93, label: "22.93 mm" },
  ]
const wSizesRings = [
    { value: 15.92, label: "15.92 mm"},
    { value: 16.24, label: "16.24 mm" },
    { value: 16.56, label: "16.56 mm" },
    { value: 16.88, label: "16.88 mm" },
    { value: 17.20, label: "17.20 mm" },
    { value: 17.52, label: "17.52 mm" },
    { value: 17.83, label: "17.83 mm" },
    { value: 18.15, label: "18.15 mm" },
    { value: 18.47, label: "18.47 mm" },
  ]

export default function Product() {
    const { t, i18n } = useTranslation();
    const[product, setProduct] = useState();
    const[activeRingModal, setActiveRingModal] = useState(false);
    const[activeBeltModal, setActiveBeltModal] = useState(false);
    const[visualSizeSku, setVisualSizeSku] = useState("");
    const[productType, setProductType] = useState("");
    const[showSizes, setShowSizes] = useState('0');


    const[sizeError, setSizeError] = useState(null);
    const[varError, setVarError] = useState(null);

    const[varId, setVarId] = useState(0);

    const[cartName, setCartName] = useState('');
    const[cartPrice, setCartPrice] = useState(0);
    const[oldPrice, setOldPrice] = useState(0);
    const[cartSku, setCartSku] = useState(0);
    const[cartSize, setCartSize] = useState(0);
    const[cartQty, setCartQty] = useState(1);
    const[material, setMaterial] = useState('');
    const[props, setProps] = useState('');
    const[description, setDescription] = useState('');
    const[videoSrc, setVideoSrc] = useState('');
    const[poster, setPoster] = useState('');
    const[womenSizeTypes, setWomenSizeTypes] = useState();
    const[gtm, setGtm] = useState('');
    const [sliderItems, setSliderItems] = useState([]);

    const[variations, setVariations] = useState([]);
    const allProducts = useSelector(state=>state.products.items)
    const switchLng = useSelector(state=>state.user.switchLng)
    const dispatch = useDispatch();

const {id} = useParams();

    const findProduct = useCallback(()=>{
        if(allProducts.length > 0){
            
        }else{
            dispatch(getProducts());
            
        }
    }, [])

    const switchVariation = (name, priceRegular, priceSale, sku, id, gmt) => {
        
        setCartName(name) 
        if(priceSale){
            setCartPrice(priceSale)
            setOldPrice(priceRegular)
        }else{
            setCartPrice(priceRegular)
            setOldPrice(0)
        }
        setGtm(gmt)
        
        setCartSku(sku)
        setVarId(id)
    }

    const putInCart = () => {
        if(productType === "belt" && !cartName){setVarError('Chose variation'); return;}
        if(productType === "belt" && !cartSize){
            if (cartName.includes('Only buckle')){
               
            }else{
                setSizeError('Chose size'); return;
            }
        }
        //if(product?.meta_data[6].value === "belt" && !cartSize){setSizeError('Chose size'); return;}
        if(productType === "ring" && !cartSize && showSizes === '1'){setSizeError('Chose size'); return;}
        let item = {};
        if(productType === "ring"){
             item = {
                
                id: product.id,
                url: window.location.href,
                name: cartName || product.name,
                price: cartPrice ||  product.price,
                sku: product.sku  + `-${cartSize}`,
                img: product?.images[0].src,
                size: cartSize,
                qty: cartQty
               };
        }else{
            item = {
                id: varId || product.id,
                url: window.location.href,
                name: cartName || product.name,
                price: cartPrice ||  product.price,
                sku: product.sku || cartSku + `-${cartSize}`,
                img: product?.images[0].src,
                size: cartSize,
                qty: cartQty
               };
        }
        setSizeError(null);
        setVarError(null);
        
       dispatch(addToCart(item));
       dispatch(showCard(true));
      //  window.fbq('track', 'AddToCart', {value: product.price * cartQty, currency: 'USD'});
    }


    const plusQty = () => {
        setCartQty(cartQty + 1)
    }
    const minusQty = () => {
        if(cartQty === 1){  return false; }
        setCartQty(cartQty - 1) 
    }

    const find = (event) => {
        setCartSize(event.value)
        setVisualSizeSku(event.value)
        
      }

    useEffect(()=>{
        const data = allProducts.find(obj => obj.slug === id);
        setProduct(data)


        console.log(data);
        console.log(id);
        let featuredArr = [];
        data?.categories?.forEach(cat => {
             featuredArr =  allProducts.filter(obj => obj.categories.some((el)=> el.id === cat.id));
        })
        // const featuredArr =  allProducts.filter(obj => obj.categories.some((el)=> el.id === id));

        console.log(featuredArr);
        setSliderItems(featuredArr)


    },[allProducts]);

    useEffect(()=>{
        if(product?.variations){
             try {
                 const fetchvariationsromises =  product.variations.map(el =>
                     axios.post(`${process.env.REACT_APP_API_URL}/api/products/getProductById`, { id: el })
                 );
                 Promise.all(fetchvariationsromises).then((values) => {
                     setVariations(prev => [...prev, values]);
                 
                 });
             } catch (err) {
                 console.log(err);
             }
         }

        let prefix = "name_" + localStorage.getItem("lng");
        let langVal = product?.meta_data?.find(obj => obj.key === prefix);
        setCartName(langVal?.value);


        (console.log(product))
    },[product])

    useEffect(()=>{
        let prefixName = "name_" + localStorage.getItem("lng") || "en";
        if(localStorage.getItem("lng") === "ua"){
             prefixName = "name_uk" ;
        }
        let prefixMaterial = "materials_" + localStorage.getItem("lng") || "en";
        if(localStorage.getItem("lng") === "ua"){
            prefixMaterial = "materials_uk" ;
       }
        let prefixProps = "materials_weight_" + localStorage.getItem("lng") || "en";
        if(localStorage.getItem("lng") === "ua"){
            prefixProps = "materials_weight_uk" ;
       }
        let prefixDescr = "description_" + localStorage.getItem("lng") || "en";
        if(localStorage.getItem("lng") === "ua"){
            prefixDescr = "description_uk" ;
       }
        let langName = product?.meta_data?.find(obj => obj.key === prefixName);
        let langMaterial = product?.meta_data?.find(obj => obj.key === prefixMaterial);
        let langProps = product?.meta_data?.find(obj => obj.key === prefixProps);
        let langDescr = product?.meta_data?.find(obj => obj.key === prefixDescr);
        let video =  product?.meta_data?.find(obj => obj.key === "video_file_link");
        let poster =  product?.meta_data?.find(obj => obj.key === "poster_image_url");
        let prType =  product?.meta_data?.find(obj => obj.key === "product_type");
        let showSizeAcs =  product?.meta_data?.find(obj => obj.key === "show_size_list");
        let sizeRingType =  product?.meta_data?.find(obj => obj.key === "w_rings_sizes");
        

        setPoster(poster?.value);
        setVideoSrc(video?.value);
        setCartName(langName?.value);
        setMaterial(langMaterial?.value);
        setProps(langProps?.value);
        setDescription(langDescr?.value);
        setProductType(prType?.value);
        setWomenSizeTypes(sizeRingType?.value);
        setShowSizes(showSizeAcs?.value);

    }, [switchLng,product])

    useEffect(()=>{
        findProduct();
        window.scrollTo(0, 0);
        dispatch(clearActiveCats());
        // window.fbq.disablePushState = true;
        
        if(window.fbq){
            window.fbq('track', 'ViewContent', { 
                content_type: 'product',
                content_ids: ['1234'],
                content_name: 'product',
                //content_category: 'product',
                value: 0.50,
                currency: 'USD'
              })
            window.fbq('track', 'PageView')
        }  

    },[])


 


  return (
    <>
        <Helmet> 
            <link rel="canonical" href={`sicvolo.com${window.location.pathname}`} />
            <title>{`${product?.yoast_head_json.title} ${cartName}`}</title>
            <meta name='description' content={product?.yoast_head_json.og_description} />
        </Helmet>


     <div className={styles.productWrapp}>
     <div className="breadcrumbsProduct" >
          <Link to={
          (localStorage.getItem("lng") === 'en')
          ? '/'
           :
           `/${localStorage.getItem("lng")}`
         }>{t("Home page")}</Link>
          <Link to={
          (localStorage.getItem("lng") === 'en')
          ? '/catalog'
           :
           `/${localStorage.getItem("lng")}/catalog`
         }>{t("catalog")}</Link>
          <span>{cartName || product?.name }</span>
        </div>
<div className={styles.SliderWrap}>
      
    {product?.images && <Carousel images={product?.images} video={videoSrc} poster={poster}  />  }
    

</div>
<div className={styles.productData}>

  <div className={styles.productData_top}>
      <h1 className={styles.productData_name}>{cartName || product?.name } </h1>

     {(productType === "belt" || productType === "ring") ? 
     (<p className={styles.productData_sku}>{product?.sku ?  (`${product?.sku}-${visualSizeSku}`) : (`${cartSku}-${visualSizeSku}`)   }</p>) 
        : 
     (<p className={styles.productData_sku}>{ cartSku || product?.sku}</p>)
     } 

     {product?.type === "simple" &&
        (
            product?.sale_price ? (
                <div className={styles.productData_price}>
                  {console.log(product?.price)}
                  {/* $ {product?.sale_price} */}
                  <Convert usdPrice={product?.sale_price} oldPrice={ product?.regular_price} />
                    {/* <span className={styles.oldPrice}>$ {cartPrice || product?.regular_price}</span> */}
                    
                    {product?.date_on_sale_to_gmt && 
                        (<Timer gtm={product?.date_on_sale_to_gmt} />)
                    }
                    
                </div>
               
            ) : (
                <div className={styles.productData_price}>
                    {/* $ {cartPrice || product?.regular_price} */}
                    <Convert usdPrice={ product?.price} />
                </div>
            )
        )
     }
     {product?.type === "variable" &&
        (
            <div className={styles.productData_price}>
                 {/* $ {cartPrice || product?.price} */}
                 <Convert usdPrice={cartPrice || product?.price} />
                {oldPrice !== 0 && (  <span className={styles.oldPrice}>$ {oldPrice}</span>)} 
              
                {/* <span className="convertPrice">({(parseFloat(cartPrice || product?.price) * parseFloat(38.8) / 1).toFixed(2)} UAH)</span> */}
                {gtm && 
                        (<Timer gtm={gtm} />)
                }
            </div>
        )
     }
     
      {/* <div className={styles.productData_price}>
        $ {cartPrice || product?.regular_price}
        <span className={styles.oldPrice}>$ {product?.sale_price}</span>
       </div> */}

        <div className={styles.productData_item}>
            <p className={styles.productSubTitle}>{t('Materials')}</p>
            <span>{material}</span>
        </div>

        {product?.meta_data[4].value && (
            <div className={styles.productData_item}>
            <p className={styles.productSubTitle}>{t('Props')}</p>
            <span>{props}</span>
        </div>
        )}
     


    {variations[0]?.length > 0 && (
         <div className={styles.productData_attrs}>
         <p className={styles.productAttrSubTitle}>{t('Colors')}</p>
       
            {variations[0]?.map((obj, i) => (
                // console.log(obj)
                <button 
                    title={obj.data.name}
                    className={obj.data.name === cartName ? `${styles.activeColor} ${styles.productColor}` : `${styles.productColor}`}
                    
                    onClick={()=>{switchVariation(obj.data.name, obj.data.regular_price, obj.data.sale_price, obj.data.sku, obj.data.id, obj.data.date_on_sale_to_gmt )}}
                    key={i}
                    >
                    <img src={obj.data.images[0].src} alt="" />
                </button>
            )
            )}
         {varError && (<div className="errorProduct">{varError}</div>) }
     </div>

    )}
     
     {productType === "belt" && (
        <div className={styles.productData_attrs}>
        <p className={styles.productAttrSubTitle}>{t('Size')}</p>
        {beltSizes.map((el, i)=> 
        <button
                key={i}
                className={el === cartSize ? `${styles.activeSize} ${styles.productSize}` : `${styles.productSize}`}
                onClick={()=>{setCartSize(el); setVisualSizeSku(el)}}>
                    {el}
        </button>)}
        {sizeError && (<div className="errorProduct">{sizeError}</div>) }
    </div>
     )}

            {console.log(showSizes)}
     { (productType === "ring" && showSizes === '1') ? (
        <div className={styles.productData_attrs}>
        <p className={styles.productAttrSubTitle}>Size</p>
        <Select options={womenSizeTypes === "1" ? wSizesRings : optionsRings}
         onChange={find}
           className="ring-sizes-select"
          
           styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              boxShadow: 'none',
            }),
            menu: (provided, state) => ({
                ...provided,
                border: "none",
                boxShadow: "none",
                backgroundColor: "#131313"
              }),
            option: (provided, state) => ({
                ...provided,
                color: "#fff",
                fontSize: 16,
                backgroundColor: state.isFocused ? "#333" : "#1a1a1a",
                cursor: "pointer",
                borderColor: "#333",
                outline: "none",
                border: "none"

            })

            
          }}
  classNamePrefix="react-select" />
       {/* {ringsSizes.map((el)=> <button className={styles.productSize} onClick={()=>{setCartSize(el)}}>{el}</button>)} */}
       {sizeError && (<div className="errorProduct">{sizeError}</div>) }
    </div>
     ) : ''}
      

    {productType === "ring" && (<><a href="#" onClick={()=> setActiveRingModal(true)} className={styles.sizeDetermine} alt="">{t('determine')}</a> <a href=" https://www.youtube.com/watch?v=LfdPTxCo6_A&ab_channel=wikiHow" target="blank" className={styles.watchYoutube}><img src="/img/youtube_size.svg" alt="" />{t('watch')} </a></>)}

    {productType === "belt" && (<><a href="#" onClick={()=> setActiveBeltModal(true)} className={styles.sizeDetermine} alt="">{t('determine')}</a> <a href="https://www.youtube.com/watch?v=izXvP07zhro&ab_channel=EngravedGiftIdeas" target="blank" className={styles.watchYoutube}><img src="/img/youtube_size.svg" alt="" /> {t('watch')}</a></>)}
   

  <div className={styles.productAddBox}>
      <div className={styles.productQty}>
          {/* <button className={styles.productQtyPlus} onClick={minusQty}> <img src="/img/minusBtn.svg" alt="" /> </button> */}
          <button className={styles.productQtyPlus} onClick={minusQty}> - </button>
          <span className={styles.productQtyNum}>{cartQty}</span>
          {/* <button className={styles.productQtyMinus} onClick={plusQty}><img src="/img/plusBtn.svg" alt="" /></button> */}
          <button className={styles.productQtyMinus} onClick={plusQty}>+</button>
      </div>
   
    
      <a href="#" className={styles.addToCard} onClick={putInCart}>{t('addToCart')}</a>
  </div>

</div>


 

</div>

<div className={styles.productData_descr}>
      <p className={styles.productSubTitle}>{t('description')}</p>
      <div className={styles.productData_descr_text}>
      <div dangerouslySetInnerHTML={{ __html: description }} />
         
      </div>
  </div>


</div>


<div className={styles.newProducts}>
        <h2>{t("YOU MAY ALSO LIKE")}</h2>
        <div className="newProduct_slider">
          <Slider {...settingsNew}>
            {sliderItems?.map((obj, i)=>  <ProductCard isCentered={true}  name={obj.name} img={obj.images[0]?.src} price={obj.price} link={obj.slug} key={i} meta={obj.meta_data} /> )}
 
          </Slider>
        </div>
      </div>

<Runing />

<RingSizeModal active={activeRingModal} closeModal={()=>{setActiveRingModal(false)}} /> 
<BeltSizeModal active={activeBeltModal} closeModal={()=>{setActiveBeltModal(false)}} /> 
    </>
   
  )
}
