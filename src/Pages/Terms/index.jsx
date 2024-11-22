import {useState} from 'react'
import styles from "./Terms.module.scss"
import {Link} from "react-router-dom"
import { useEffect } from 'react'
import { useTranslation  } from 'react-i18next';
import axios from "axios";
import {Helmet} from "react-helmet";

export default function Terms() {
  const { i18n } = useTranslation();
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
      const apiCat = data?.filter((obj) => obj.id === 1940);
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
          content_type: 'Terms of Service page',
          content_ids: ['1234'],
          content_name: 'Terms of Service page',
          content_category: 'Terms of Service page',
         
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
       {i18n.language === "en" && (<>
        <h1 >Terms of Service</h1>
   

        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Introduction</p>
          <div className={styles.policy_item_text}>
              <p>Welcome to sicvolo.com, your distinguished online destination for luxury goods, specializing in the sale of exquisite accessories made from precious materials. By accessing and utilizing our website, you hereby agree to adhere to the following Terms of Service. We urge you to review these terms meticulously before engaging in any transactions.</p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Agreement</p>
          <div className={styles.policy_item_text}>
              <p>Through your access to our website and participation in purchases, you affirm your understanding, acknowledgment, and consent to these Terms of Service, in conjunction with our Privacy Policy and any other pertinent regulations. Placing an order for the purchase of items on the sicvolo.com website is considered an act of consent and confirmation. Should you disagree with any aspect of these terms, we kindly request that you abstain from using our services. You declare that you have reached the age of majority, and you have provided us with your consent to allow any of your minor dependents to use this website.
              Any offer for any product or service made on this site is void where prohibited.
              </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Product descriptions and information</p>
          <div className={styles.policy_item_text}>
              <p>We take immense pride in providing accurate, detailed descriptions, and imagery of our luxury accessories. Kindly note that minor variations may occur due to the unique nature of our products. The weight and characteristics of the product may differ slightly from those indicated on the website. We encourage you to carefully review product details and reach out to our customer service team for any necessary clarifications before finalizing a purchase.  <br />
              We cannot guarantee that your monitor's display of any color will be accurate. <br />
              We reserve the right to modify the content of this website at any time, but we are not obligated to update any information on our site. You agree that you are responsible for tracking changes on our website.
              The prices of our products may be changed without prior notice.  <br />
              We reserve the right to modify or terminate the Service (or any part of it or content) at any time without prior notice. <br />
              We shall not be liable to you or any third party for any modifications, price changes, suspension, or termination of the Service.
  
              </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Ordering and payment</p>
          <div className={styles.policy_item_text}>
                <p>Upon placing an order on sicvolo.com, you assert that the information submitted, including billing details, is accurate and complete. Secure processing of payments is facilitated through authorized payment gateways. Our prices are listed in your preferred currency and may be subject to relevant taxes and fees. Please note that we retain the right to modify product prices without prior notice. 
                We reserve the right to limit the sale of our products or services to any person, geographic region, or jurisdiction. We may exercise this right on a case-by-case basis. <br />
                You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. If we need to clarify certain details at the time of ordering, making changes or canceling an order, we may attempt to notify you by contacting the email address and/or billing address/phone number provided at the time of ordering.
              </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Intellectual property</p>
          <div className={styles.policy_item_text}>
                <p>The intellectual property encompassing content, design, and branding featured on sicvolo.com is owned by private entrepreneur Berezovskiy Oleksandr and protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. Any reproduction, modification, distribution, or utilization of our website's elements and models necessitates obtaining explicit written consent.
              </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Third-party links</p>
          <div className={styles.policy_item_text}>
                <p>Certain content, products and services available via our Service may include materials from third-parties. <br />
                  Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties. <br />
                  We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
                  </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Privacy</p>
          <div className={styles.policy_item_text}>
                <p>We value your privacy profoundly. Comprehensive insights into data collection, usage, and protection can be gleaned from our <Link to="/policy" >Privacy Policy</Link>. 
                  </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Severability</p>
          <div className={styles.policy_item_text}>
                <p>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.</p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Termination</p>
          <div className={styles.policy_item_text}>
                <p>The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes. <br />
                These Terms of Service are effective unless and until terminated by either you or us.
                </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Limitation of Liability</p>
          <div className={styles.policy_item_text}>
                <p>Kindly note that sicvolo.com and its affiliates shall not be held accountable for any direct, indirect, incidental, consequential, or punitive damages stemming from the use of our website or products.</p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Governing law</p>
          <div className={styles.policy_item_text}>
                <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Ukraine.</p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Contact information</p>
          <div className={styles.policy_item_text}>
                <p>
                Questions about the Terms of Service should be sent to us at <a href="mailto:info@sicvolo.com">info@sicvolo.com</a>  <br />
  
                Sicvolo.com is operated by private entrepreneur Berezovskiy Oleksandr (Ukraine, Kyiv, 18 Kaschenka Akademika str.).  <br />
  
                Thank you for selecting sicvolo.com and as your preferred purveyor of luxury accessories. We are committed to delivering an unparalleled shopping experience, embodying refinement and exclusivity. Should you require any assistance or have inquiries, our dedicated customer service team is at your service (service@sicvolo.com).
  
                </p>
          </div>
        </div>
        </>
       )}
       {i18n.language === "ua" && (<>
        <h1 >ЗАГАЛЬНІ УМОВИ</h1>
   

        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Вступ</p>
          <div className={styles.policy_item_text}>
              <p>Ласкаво просимо на сайт sicvolo.com, який спеціалізується на продажі вишуканих аксесуарів з дорогоцінних матеріалів. Заходячи на наш веб-сайт і використовуючи його, ви автоматично погоджуєтеся дотримуватися наступних Умов використання сайту. Ми радимо вам уважно переглянути ці умови перед здійсненням будь-яких транзакцій.</p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Угода</p>
          <div className={styles.policy_item_text}>
              <p>Користуючись нашим веб-сайтом і беручи участь у покупках, ви підтверджуєте своє розуміння та згоду з цими Умовами, разом з нашою Політикою конфіденційності та будь-якими іншими відповідними правилами. Розміщення замовлення на покупку товарів на веб-сайті sicvolo.com розглядається як акт згоди з його умовами. У випадку несхвалення будь-якого аспекту цих умов, ми люб'язно просимо утриматися від використання наших послуг. Ви заявляєте, що досягли повноліття і надали нам згоду на використання цього веб-сайту будь-яких ваших неповнолітніх дітей. Будь-яка пропозиція щодо будь-якого продукту чи послуги, розміщена на цьому сайті, недійсна в тих місцях, де це заборонено.
              </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Опис продукції та інформація</p>
          <div className={styles.policy_item_text}>
              <p>Ми пишаємося наданням точних, детальних описів та зображень наших розкішних аксесуарів. Зверніть увагу, що можуть відбуватися незначні відмінності через унікальність наших продуктів. Вага та характеристики продукту можуть трохи відрізнятися від зазначених на веб-сайті. Ми радимо вам уважно ознайомитися з деталями продукту і звернутися до нашої служби підтримки клієнтів для будь-яких необхідних пояснень перед завершенням покупки. Ми не можемо гарантувати, що відображення будь-якого кольору на вашому моніторі буде точним. Ми залишаємо за собою право змінювати вміст цього веб-сайту в будь-який час, але не зобов'язані оновлювати будь-яку інформацію на нашому сайті. Ви погоджуєтеся, що ви несете відповідальність за відстеження змін на нашому веб-сайті. Ціни на наші продукти можуть бути змінені без попереднього повідомлення. Ми залишаємо за собою право змінювати або припиняти надання послуг (або будь-яку їх частину чи вміст) в будь-який час без попереднього повідомлення. Ми не несемо відповідальності перед вами або будь-якою третьою стороною за будь-які модифікації, зміни цін, призупинення або припинення надання послуг.
              </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Замовлення та оплата</p>
          <div className={styles.policy_item_text}>
                <p>Подавши замовлення на sicvolo.com, ви підтверджуєте, що надана інформація, включаючи платіжні дані, є точною та повною. Безпечна обробка платежів здійснюється через авторизовані платіжні шлюзи. Транзакції можуть підлягати відповідним податкам і зборам. Зверніть увагу, що ми залишаємо за собою право змінювати ціни на продукти без попереднього повідомлення. Ми залишаємо за собою право обмежувати чи відмовляти у продажі наших продуктів. Ми можемо використовувати це право в кожному окремому випадку. Ви погоджуєтеся надавати поточну, повну та точну інформацію про покупки та облікові дані для всіх покупок, здійснених у нашому магазині. Якщо нам потрібно уточнити певні деталі під час оформлення, зміни або скасування замовлення, ми можемо спробувати повідомити вас про ці дії, зв'язавшись з вами електронною поштою та/або за телефонним номером, вказаними під час замовлення.
              </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Інтелектуальна власність</p>
          <div className={styles.policy_item_text}>
                <p>Фізична особа-підприємець Березовський Олександр Володимирович є правомірним користувачем торгівельної марки SIC VOLO та інтелектуальної власності, розміщеної на сайті sicvolo.com, (контент, дизайн та брендінг) яка захищена міжнародними законами про авторське право, товарні знаки, патенти, комерційну таємницю та іншими правами інтелектуальної власності чи правами на власність. Будь-яке відтворення, модифікація, розповсюдження або використання елементів та моделей нашого веб-сайту потребує отримання письмової згоди.
              </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Посилання на сторонніх осіб</p>
          <div className={styles.policy_item_text}>
                <p>Певний контент, продукти та послуги, доступні за допомогою нашої Служби, можуть включати матеріали від сторонніх осіб. Посилання на сторонні ресурси на цьому сайті можуть направляти вас на веб-сайти сторонніх осіб, які не пов'язані з нами. Ми не несемо відповідальності за перевірку або оцінку змісту чи точності і не гарантуємо та не несемо жодної відповідальності за будь-які матеріали або веб-сайти сторонніх осіб. Ми не несемо відповідальності за будь-яку шкоду чи збитки, пов'язані з покупкою або використанням товарів, послуг, ресурсів, контенту чи будь-яких інших транзакцій, здійснених у зв'язку з будь-якими веб-сайтами сторонніх осіб. Будь ласка, уважно ознайомтеся з політикою та практиками сторонніх осіб та переконайтеся, що ви їх розумієте перед тим, як здійснити будь-яку транзакцію. Скарги, претензії, питання або запитання стосовно продуктів сторонніх осіб слід надсилати стороннім особам.
                  </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Конфіденційність</p>
          <div className={styles.policy_item_text}>
                <p>Ми високо цінуємо вашу конфіденційність. Детальні відомості про збір, використання та захист персональних даних можна отримати в розділі <Link to="/ua/policy" >«Політика конфіденційності»</Link>. 
                  </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Обмеження відповідальності</p>
          <div className={styles.policy_item_text}>
                <p>Зверніть увагу, що сайт sicvolo.com та його представники не несуть відповідальності за прямі, опосередковані, випадкові, наслідкові збитки, що виникають в результаті використання нашого веб-сайту чи продуктів.</p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Законодавство</p>
          <div className={styles.policy_item_text}>
                <p>Ці Умови обслуговування та будь-які окремі угоди, за якими ми надаємо вам послуги, підлягають та тлумачяться відповідно до законів України.
                </p>
          </div>
        </div>
       
       
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Контактна інформація</p>
          <div className={styles.policy_item_text}>
                <p>
                Питання про Умови обслуговування можна надсилати нам на адресу <a href="mailto:info@sicvolo.com">info@sicvolo.com</a>  <br />
  
                Sicvolo.com працює під управлінням приватного підприємця Березовського Олександра (Україна, м. Київ, вул. Кащенка Академіка, 18).<br />
  
                Дякуємо вам за вибір sicvolo.com як вашого переважного постачальника розкішних аксесуарів. Якщо вам потрібна допомога або у вас виникли запитання, пишіть на адресу: service@sicvolo.com .
  
                </p>
          </div>
        </div>
        </>
       )}

{i18n.language === "ru" && (<>
        <h1>Общие условия</h1>
   

        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Вступление</p>
          <div className={styles.policy_item_text}>
              <p>Введение Добро пожаловать на сайт sicvolo.com, специализирующийся на продаже изысканных аксессуаров из драгоценных материалов. Посещая наш веб-сайт и используя его, вы автоматически соглашаетесь соблюдать следующие Условия использования сайта. Мы рекомендуем вам внимательно ознакомиться с этими условиями перед совершением любых транзакций.</p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Соглашение</p>
          <div className={styles.policy_item_text}>
              <p>Используя наш веб-сайт и участвуя в покупках, вы подтверждаете свое понимание и согласие с этими Условиями, вместе с нашей Политикой конфиденциальности и любыми другими соответствующими правилами. Размещение заказа на покупку товаров на веб-сайте sicvolo.com рассматривается как акт согласия с его условиями. В случае несогласия с любым аспектом этих условий, мы любезно просим вас воздержаться от использования наших услуг. Вы заявляете, что достигли совершеннолетия и дали нам согласие на использование этого веб-сайта любыми вашими несовершеннолетними детьми. Любое предложение о любом продукте или услуге, размещенное на этом сайте, недействительно в тех местах, где это запрещено. </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Описание продукции и информация</p>
          <div className={styles.policy_item_text}>
              <p>Мы гордимся предоставлением точных, детальных описаний и изображений наших роскошных аксессуаров. Обратите внимание, что могут происходить незначительные отличия из-за уникальности наших продуктов. Вес и характеристики продукта могут немного отличаться от указанных на веб-сайте. Мы рекомендуем вам внимательно ознакомиться с деталями продукта и обратиться к нашей службе поддержки клиентов для любых необходимых пояснений перед завершением покупки. Мы не можем гарантировать, что отображение любого цвета на вашем мониторе будет точным. Мы оставляем за собой право изменять содержимое этого веб-сайта в любое время, но не обязаны обновлять любую информацию на нашем сайте. Вы соглашаетесь, что несете ответственность за отслеживание изменений на нашем веб-сайте. Цены на наши продукты могут быть изменены без предварительного уведомления. Мы оставляем за собой право изменять или прекращать предоставление услуг (или любую их часть или содержание) в любое время без предварительного уведомления. Мы не несем ответственности перед вами или любой третьей стороной за любые модификации, изменения цен, приостановление или прекращение предоставления услуг.
              </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Заказ и оплата</p>
          <div className={styles.policy_item_text}>
                <p>Подавая заказ на sicvolo.com, вы подтверждаете, что предоставленная информация, включая платежные данные, является точной и полной. Безопасная обработка платежей осуществляется через авторизованные платежные шлюзы. Транзакции могут подлежать соответствующим налогам и сборам. Обратите внимание, что мы оставляем за собой право изменять цены на продукты без предварительного уведомления. Мы оставляем за собой право ограничивать или отказывать в продаже наших продуктов. Мы можем использовать это право в каждом отдельном случае. Вы соглашаетесь предоставлять актуальную, полную и точную информацию о покупках и учетные данные для всех покупок, совершенных в нашем магазине. Если нам потребуется уточнить определенные детали во время оформления, изменения или отмены заказа, мы можем попытаться уведомить вас о таких действиях, связавшись с вами по электронной почте и/или по указанному во время заказа номеру телефона.
              </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Интеллектуальная собственность</p>
          <div className={styles.policy_item_text}>
                <p>Физическое лицо - предприниматель Березовский Александр Владимирович является законным пользователем товарного знака SIC VOLO и интеллектуальной собственности, размещенной на сайте sicvolo.com (контент, дизайн и брендинг), защищенной международными законами об авторском праве, товарных знаках, патентах, коммерческой тайне и другими правами интеллектуальной собственности или правами собственности. Любое воспроизведение, модификация, распространение или использование элементов и моделей нашего веб-сайта требует получения письменного согласия. 
              </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Ссылки на третьи лица</p>
          <div className={styles.policy_item_text}>
                <p>Определенный контент, продукты и услуги, доступные через нашу Службу, могут включать материалы от третьих лиц. Ссылки на сторонние ресурсы на этом сайте могут направлять вас на веб-сайты третьих лиц, не связанные с нами. Мы не несем ответственности за проверку или оценку содержания или точности и не гарантируем и не несем никакой ответственности за любые материалы или веб-сайты третьих лиц. Мы не несем ответственности за любой ущерб или убытки, связанные с покупкой или использованием товаров, услуг, ресурсов, контента или любых других транзакций, совершенных в связи с любыми веб-сайтами третьих лиц. Пожалуйста, внимательно ознакомьтесь с политикой и практикой третьих лиц и убедитесь, что вы их понимаете, прежде чем совершать любые транзакции. Жалобы, претензии, вопросы или запросы относительно продуктов третьих лиц следует направлять третьим лицам. 
                  </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Конфиденциальность</p>
          <div className={styles.policy_item_text}>
                <p>Мы высоко ценим вашу конфиденциальность. Подробная информация о сборе, использовании и защите персональных данных доступна в разделе  <Link to="/ua/policy" >"Политика конфиденциальности"</Link>. 
                  </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Ограничение ответственности</p>
          <div className={styles.policy_item_text}>
                <p>Обратите внимание, что сайт sicvolo.com и его представители не несут ответственности за прямые, косвенные, случайные, последующие убытки, возникшие в результате использования нашего веб-сайта или продуктов. </p>
          </div>
        </div>
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Законодательство</p>
          <div className={styles.policy_item_text}>
                <p>Эти Условия обслуживания и любые отдельные соглашения, в рамках которых мы предоставляем вам услуги, подчиняются и толкуются в соответствии с законами Украины.  </p>
          </div>
        </div>
       
       
        <div className={styles.policy_item}>
          <p className={styles.policy_item_title}>Контактная информация</p>
          <div className={styles.policy_item_text}>
                <p>
                Вопросы о Условиях обслуживания можно направлять по адресу  <a href="mailto:info@sicvolo.com">info@sicvolo.com</a>  <br />
  
                Sicvolo.com действует под управлением частного предпринимателя Березовского Александра (Украина, г. Киев, ул. Кащенко Академика, 18). <br />
  
                Благодарим вас за выбор sicvolo.com в качестве вашего предпочтительного поставщика роскошных аксессуаров. Если вам нужна помощь или у вас возникли вопросы, пожалуйста, напишите на адрес: service@sicvolo.com .
  
                </p>
          </div>
        </div>
        </>
       )}


    </div>


    </>
   
  )
}
