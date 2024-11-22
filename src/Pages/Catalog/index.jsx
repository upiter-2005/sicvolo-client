import {useEffect, useState} from "react";
import FilterButton from "../../Components/FilterButton";
import FilterButtonSub from "../../Components/FilterButtonSub";
import ProductCard from "../../Components/ProductCard";
import Runing from "../../Components/Runing";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, plusActiveCat, setActiveCats, setPageCat, setSubCats} from "../../redux/slices/productsSlice";
import {Link, useParams} from "react-router-dom";
import qs from "qs";
import axios from "axios";
import Skeleton from "../../Components/Skeleton";
import ReactPixel from 'react-facebook-pixel';
import MetaPixel from "../../utils/MetaPixel"
import {Helmet} from "react-helmet";
import ParseHTML, { parseHTMLString } from 'react-parse-htmlstring';

import styles from "./Catalog.module.scss";
import { useTranslation  } from 'react-i18next';

// const allCats = [
//   {id: 19, name: "Belts", link: "belts"},
//   {id: 20, name: "Jewelry", link: "rings"},
//   {id: 22, name: "Accessories", link: "accessories"},
//   {id: 18, name: "For her", link: "for-her"},
//   {id: 17, name: "For him", link: "for-him"},
//   //{id: 1, name: "All products", link: "All products"},
//   {id: 21, name: "Haute Skull Couture", link: "haute-skull-couture"},
//   {id: 45, name: "Majestic Wildlife", link: "majestic-wildlife"},
//   {id: 32, name: "Nautical Treasures", link: "nautical-treasures"},
//   {id: 47, name: "Blossom symphony", link: "blossom-symphony"},
//   {id: 74, name: "Diamonds", link: "diamonds"},
//   {id: 75, name: "	Gold", link: "gold"},
//   {id: 76, name: "Silver", link: "silver"},
//   {id: 77, name: "Platinum", link: "platinum"},

// ];

// const categoriesTop = [
//   {id: 19, name: "Belts", link: "belts"},
//   {id: 20, name: "Jewelry", link: "rings"},
//   {id: 22, name: "Accessories", link: "accessories"},
//   {id: 18, name: "For her", link: "for-her"},
//   {id: 17, name: "For him", link: "for-him"},
//  // {id: 1, name: "All products", link: "All products"},
// ];
// const subCategories = [
//   {id: 21, name: "Haute Skull Couture", link: "haute-skull-couture"},
//   {id: 45, name: "Majestic Wildlife", link: "majestic-wildlife"},
//   {id: 32, name: "Nautical Treasures", link: "nautical-treasures"},
//   {id: 47, name: "Blossom symphony", link: "blossom-symphony"},
//   {id: 74, name: "Diamonds", link: "diamonds"},
//   {id: 75, name: "	Gold", link: "gold"},
//   {id: 76, name: "Silver", link: "silver"},
//   {id: 77, name: "Platinum", link: "platinum"},
// ];

export default function Catalog() {
  const { t, i18n } = useTranslation();

  const allCats = [
    {id: 19, name: t("belts"), link: "belts", 
    title: "Ремни ручной работы с драгоценностями | SIC VOLO",
    descr: "Купить ремни ручной работы с золотом или серебром в магазине ✅ SIC VOLO ✅ ➤ Качественные ремни ➤ Ручная работа изделий ➤ Быстрая доставка"
    },
    {id: 20, name: t("jewelry"), link: "rings",
    title: "Украшения из серебра и серебра ручной работы | SIC VOLO",
    descr: "Купить украшения с золотом или серебром в магазине ✅ SIC VOLO ✅ ➤ Качественные дорогие украшения ➤ Ручная работа изделий ➤ Быстрая доставка"},
    {id: 22, name: t("accessories"), link: "accessories",
    title: "Аксессуары из серебра и серебра ручной работы | SIC VOLO",
    descr: "Купить брутальные мужские украшения с золотом или серебром в магазине ✅ SIC VOLO ✅ ➤ Качественные ювелирные аксессуары ➤ Ручная работа изделий ➤ Быстрая доставка"},
    {id: 18, name: t("forher"), link: "for-her",
    title: "Женские ювелирные украшения ручной работы | SIC VOLO",
    descr: "Купить украшения для женщин с золотом или серебром в магазине ✅ SIC VOLO ✅ ➤ Качественные ювелирные изделия для девушек ➤ Ручная работа изделий ➤ Быстрая доставка"},
    {id: 17, name: t("forhim"), link: "for-him",
    title: "Мужские ювелирные украшения ручной работы | SIC VOLO",
    descr: "Купить украшения для мужчин с золотом или серебром в магазине ✅ SIC VOLO ✅ ➤ Качественные ювелирные изделия для мужчин ➤ Ручная работа изделий ➤ Быстрая доставка"},
    //{id: 1, name: "All products", link: "All products"},
    {id: 21, name: t("HAUTE SKULL COUTUREm"), link: "haute-skull-couture",
    title: "Мужские пряжки на ремень ручной работы | SIC VOLO",
    descr: "Купить пряжку на мужской ремень с золотом или серебром в магазине ✅ SIC VOLO ✅ ➤ Качественные черепа от Кутюр ➤ Ручная работа изделий ➤ Быстрая доставка"},
    {id: 45, name: t("MAJESTIC WILDLIFEm"), link: "majestic-wildlife",
    title: "Ювелирные изделия с драгоценностями ручной работы | SIC VOLO",
    descr: "Купить ювелирные украшения с золотом или серебром в магазине ✅ SIC VOLO ✅ ➤ Качественные изделия ➤ Ручная работа изделий ➤ Быстрая доставка"},
    {id: 32, name: t("NAUTICAL TREASURESm"), link: "nautical-treasures",
    title: "Ювелирные пуговицы из золота и серебра ручной работы | SIC VOLO",
    descr: "Купить ювелирные пуговицы с золотом или серебром в магазине ✅ SIC VOLO ✅ ➤ Качественные изделия ➤ Ручная работа изделий ➤ Быстрая доставка"},
    {id: 47, name: t("BLOSSOM SYMPHONYm"), link: "blossom-symphony",
    title: "Ювелирные изделия с качественными драгоценностями | SIC VOLO",
    descr: "Купить ювелирные изделия с золотом или серебром в магазине ✅ SIC VOLO ✅ ➤ Качественные украшения ➤ Ручная работа изделий ➤ Быстрая доставка"},
    {id: 74, name: t("Diamonds"), link: "diamonds"},
    {id: 75, name: t("Gold"), link: "gold"},
    {id: 76, name: t("silvery"), link: "silver"},
    {id: 77, name: t("Platinum"), link: "platinum"},
  
  ];
  
  const categoriesTop = [
    {id: 19, name: t("belts"), link: "belts"},
    {id: 20, name: t("jewelry"), link: "rings"},
    {id: 22, name: t("accessories"), link: "accessories"},
    {id: 18, name: t("forher"), link: "for-her"},
    {id: 17, name: t("forhim"), link: "for-him"},
   // {id: 1, name: "All products", link: "All products"},
  ];
  const subCategories = [
    {id: 21, name: t("HAUTE SKULL COUTUREm"), link: "haute-skull-couture"},
    {id: 45, name: t("MAJESTIC WILDLIFEm"), link: "majestic-wildlife"},
    {id: 32, name: t("NAUTICAL TREASURESm"), link: "nautical-treasures"},
    {id: 47, name: t("BLOSSOM SYMPHONYm"), link: "blossom-symphony"},
    {id: 74, name: t("Diamonds"), link: "diamonds"},
    {id: 75, name: t("Gold"), link: "gold"},
    {id: 76, name: t("silvery"), link: "silver"},
    {id: 77, name: t("Platinum"), link: "platinum"},
  ];



  const {cat} = useParams();
  const {lang} = useParams();
 // const[products, setProducts] = useState([])
  const[productsFiltered, setProductsFiltered] = useState([]);
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [currentCatText, setCurrentCatText] = useState('');


  const allProducts = useSelector(state=>state.products.items)
  const isLoaded = useSelector(state=>state.products.isLoaded)
  const activeCats = useSelector(state=>state.products.activeCats)
  const subCats = useSelector(state=>state.products.subCats)
  const dispatch = useDispatch();


  const filterProduct = (categiriesArr, catId) => {
    return categiriesArr.some((el)=> el.id === catId);
  }

  const getApiCats = async(id) => {
    console.log(id);
    await axios('https://api.sicvolo.org/wp-json/wp/v2/product_cat')
    .then(res =>{
     
      const data = res.data;
      console.log(data);
      const apiCat = data?.filter((obj) => obj.id === id);
      setCategoryTitle(apiCat[0].acf)
      setCurrentCatText(apiCat[0].acf)
      console.log(apiCat[0].acf);

      if(i18n.language === "en"){
        setTitle(apiCat[0].acf.title_en);
        setDescr(apiCat[0].acf.description_en);
        setCategoryTitle(apiCat[0].acf.name_en);
       // setCurrentCatText(apiCat[0].acf.)
      }
      if(i18n.language === "sp"){
        setTitle(apiCat[0].acf.title_sp);
        setDescr(apiCat[0].acf.description_sp);
        setCategoryTitle(apiCat[0].acf.name_sp);
      }
      if(i18n.language === "fr"){
        setTitle(apiCat[0].acf.title_fr);
        setDescr(apiCat[0].acf.description_fr);
        setCategoryTitle(apiCat[0].acf.name_fr);
      }
      if(i18n.language === "it"){
        setTitle(apiCat[0].acf.title_it);
        setDescr(apiCat[0].acf.description_it);
        setCategoryTitle(apiCat[0].acf.name_it);
      }
      if(i18n.language === "ua"){
        setTitle(apiCat[0].acf.title_ua);
        setDescr(apiCat[0].acf.description_ua);
        setCategoryTitle(apiCat[0].acf.name_ua);
      }
      if(i18n.language === "ru"){
        setTitle(apiCat[0].acf.title_ru);
        setDescr(apiCat[0].acf.description_ru);
        setCategoryTitle(apiCat[0].acf.name_ru);
      }
       
    } )
   
  }

  useEffect(() => {

    if(window.fbq){
      window.fbq('track', 'ViewContent', { 
          content_type: 'Catalog page',
          content_ids: ['1234'],
          content_name: 'Catalog page',
          content_category: 'Catalog page',
          value: 0.50,
          currency: 'USD'
        })
      window.fbq('track', 'PageView')
  } 

    dispatch(getProducts());
    window.scrollTo(0, 0);
    if(cat){
      const queryCat = allCats.find(obj => cat === obj.link) 
      dispatch(setActiveCats(queryCat.id))
      console.log(queryCat.id);
      // setTitle(queryCat.title);
      // setDescr(queryCat.descr);
      getApiCats(queryCat.id);
  
    }else{
      dispatch(setActiveCats(1))
    }

  }, []);

const unicProductArr = (arr) => {
  let unicIds = [];
  arr.forEach(item => {
    unicIds.push(item.id)
  })
  unicIds = [...new Set(unicIds)];
  let pureFilterArr = [];
  unicIds.forEach(id => {
    let el = allProducts.filter(obj=> obj.id === id)
    pureFilterArr = pureFilterArr.concat(el)
  })
  setProductsFiltered(pureFilterArr);
}
useEffect(()=>{
  let filterArr = [];

  if(activeCats.length > 0){
    activeCats?.forEach(catId => {

      if(catId === 1){
        setProductsFiltered(allProducts);
        return;
      }else{
        if(subCats.length > 0 && activeCats.length >= 0){
          let temp = allProducts?.filter((obj)=> filterProduct(obj.categories, catId)) ;
          subCats.forEach((subcatId)=>{
            let subCatProducts = temp.filter(obj => 
              filterProduct(obj.categories, subcatId)
            )
             filterArr = filterArr.concat(subCatProducts)
          })
          unicProductArr(filterArr)
        }
        else{
          let temp = allProducts?.filter((obj)=> filterProduct(obj.categories, catId)) ;
          filterArr = filterArr.concat(temp)
          unicProductArr(filterArr)
        }
        
      }
    });
  }else{
    subCats.forEach((subcatId)=>{
      let subCatProducts = allProducts.filter(obj => 
        filterProduct(obj.categories, subcatId)
      )
      
       filterArr = filterArr.concat(subCatProducts)

    })

    unicProductArr(filterArr)
  }



  
}, [activeCats, allProducts, subCats])
 
  
  const items = productsFiltered?.map((obj, i)=> <ProductCard name={obj.name} img={obj.images[0]?.src} price={obj.price} link={obj.slug} key={i} meta={obj.meta_data}  />)

  const skeleton = [...new Array(8)].map((item, i) => <Skeleton key={i} />);


  
  return (
    <> 
        <Helmet>
          <link rel="canonical" href={`https://sicvolo.com${window.location.pathname}`} />
            <title>{title}</title> 
            <meta name="description" content={descr} />
            <meta property="og:title" content={title} data-react-helmet="true" />
            <meta property="og:image" content="https://sicvolo.com/img/sl2.png" />
            <meta property="og:description" content={descr} />
        </Helmet>
      <div className={styles.catalogWrapper}>
        <div className="breadcrumbs">
          <Link to={
          (localStorage.getItem("lng") === 'en')
          ? '/'
           :
           `/${localStorage.getItem("lng")}`
         }>{t("Home page")}</ Link>
          {/* <span>{t("Categories")}</span> */}
          <span>{categoryTitle ? categoryTitle : t("Categories")}</span>
        </div>
        <h1>
          {categoryTitle ? categoryTitle : t("Choose category")}
        </h1>

        <div className={styles.Productfilter}>
          <p className={styles.Productfilter_first_p}>{t("Choose category")}</p>
      
          <div className={styles.Productfilter_box}>
            {categoriesTop.map((obj, i) => (
              <FilterButton  value={obj.name} catId={obj.id} key={obj.id} />
              
            ))}
            <FilterButton  value={t('All produts')} catId={1} key={111} />
          </div>
         
          <div className={styles.Productfilter_box}> 
            
            {subCategories.map((obj, i) => (
              <FilterButtonSub  value={obj.name} catId={obj.id} key={obj.id} />
            ))}
          </div>
          <p>Results ({productsFiltered?.length})</p>
        </div>
        <div className={styles.productList}>
       
          {isLoaded === false ? skeleton : items  }
        </div>
        {/* <div className={styles.showMoreWrap}>
          <button>Show more</button>
        </div> */}
      </div>

      <div className="seo-text">
        {i18n.language === "en" &&  <ParseHTML string={currentCatText.seo_en} />}
        {i18n.language === "sp" &&  <ParseHTML string={currentCatText.seo_sp} />}
        {i18n.language === "fr" &&  <ParseHTML string={currentCatText.seo_fr} />}
        {i18n.language === "it" &&  <ParseHTML string={currentCatText.seo_it} />}
        {i18n.language === "ua" &&  <ParseHTML string={currentCatText.seo_ua} />}
        {i18n.language === "ru" &&  <ParseHTML string={currentCatText.seo_ru} />}
      </div>
      <Runing />
    </>
  );
}
