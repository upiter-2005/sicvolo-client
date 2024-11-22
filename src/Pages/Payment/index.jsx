import {useState} from 'react'
import styles from "./Payment.module.scss"
import { useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel';
import { useTranslation  } from 'react-i18next';
import axios from "axios";
import {Helmet} from "react-helmet";

export default function Payment() {
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
      const apiCat = data?.filter((obj) => obj.id === 1942);
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
          content_type: 'Payment and Shipping page',
          content_ids: ['1234'],
          content_name: 'Payment and Shipping page',
          content_category: 'Payment and Shipping page',
         
        })
      window.fbq('track', 'PageView')
    }
    
    window.scrollTo(0, 0);
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
  <h1 >Payment and Shipping</h1>
    


    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Payment</p>
      <div className={styles.policy_item_text}>
          <p>At sicvolo.com site, we offer a range of convenient payment methods to enhance your luxury shopping experience. In addition to traditional payment options, we also provide the option to pay using cryptocurrency. This secure and innovative payment method allows you to complete your purchase with ease.</p>
      </div>
    </div>

    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Prepayment transfer (bank transfer)</p>
      <div className={styles.policy_item_text}>
          <p>After we have received your order, you will receive an order confirmation by e-mail, in which you will find our bank details. The goods will be reserved for you for a maximum of 5 days until we receive your payment. If your payment is not received on time, we unfortunately have to cancel your order. Please note that a bank transfer can take 1-3 working days! Please indicate your order number and your name as reason for payment, so that we can assign your payment! If you pay in advance, we give you a 5% discount.</p>
      </div>
    </div>

    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>PayPal</p>
      <div className={styles.policy_item_text}>
          <p>With the payment service PayPal you can pay your order easily and quickly online. At the end of your order you will be automatically forwarded to PayPal, where you can log into your PayPal account and arrange your payment. You will then be redirected to our shop to confirm your purchase. Your order will be processed as soon as we receive your payment (usually within a few minutes). In case of a return the money will be credited to your Paypal account. If you do not yet have a PayPal account, you can register with PayPal during the payment process.</p>
      </div>
    </div>

    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Credit Card</p>
      <div className={styles.policy_item_text}>
          <p>We accept Visa and MasterCard. When paying by credit card, you provide your credit card details after the order process. Your order will be processed immediately after receipt. Your data will be encrypted by the SSL procedure. Your credit card will be charged with the purchase. In case of a return, the refund will be made to your credit card account.</p>
      </div>
    </div>
    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Payment Card Information Security Policy.</p>
      <div className={styles.policy_item_text}>
          <p>When paying for our services with a bank card, the payment processing (including entering the card number) takes place on a secure page of the processing system. Payment card data is transmitted to payment service providers only in encrypted form and is not stored by us. This means that your confidential information (card details, registration data, and others) does not come to us; their processing is entirely secure, and no one can access the customer's personal and banking data through our service. Working with card data involves the use of information protection standards developed by international payment systems Visa and Mastercard - Payment Card Industry Data Security Standard (PCI DSS), ensuring secure processing of the cardholder's details. The data transfer technology applied guarantees security for banking card transactions through the use of Secure Sockets Layer (SSL) protocols and other security methods."</p>
      </div>
    </div>
    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Apple Pay and Google Pay</p>
      <div className={styles.policy_item_text}>
          <p>We offer convenient payment options to ensure a seamless shopping experience for our customers. You can pay for your order using Apple Pay and Google Pay services. These secure and user-friendly payment methods provide a hassle-free way to complete your purchase. <br />
          Apple Pay and Google Pay ensures the security of your payment information and speeds up the checkout process.
          </p>
      </div>
    </div>
    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Cryptocurrency Payment:</p>
      <div className={styles.policy_item_text}>
          <p>During the checkout process you will be provided with the necessary details to complete the cryptocurrency transaction, including the wallet address and the amount in the chosen cryptocurrency. <br />
          Open your preferred cryptocurrency wallet and initiate the payment by entering the provided details. <br />
          Once the payment is confirmed on the blockchain, you will receive an order confirmation email. <br />
          Please note that using cryptocurrency for payment adds an extra layer of security and privacy to your transaction. If you have any questions or encounter any issues while making a cryptocurrency payment, our Customer Support team is available to assist you.
          </p>
      </div>
    </div>
    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Shipping</p>
      <div className={styles.policy_item_text}>
          <p>In most cases, we dispatch the goods within 5 business days from the moment of payment. In some instances, due to the absence of a ready-made belt in the desired color, order fulfillment may take up to 20 days. Additionally, custom orders may also require up to 20 days for production. The shipping process can take 1 - 3 weeks after dispatch depending on the country. Regardless, we will exert every effort to ensure our customers receive their orders within the shortest possible timeframe. During the order process, please reach out to our Customer Care Service to clarify all details.
          <br />
          Our commitment to convenience extends to complimentary shipping services predominantly provided through postal carriers. In special cases warrant personal deliveries orchestrated by our dedicated courier service. Upon dispatch, you will be provided with tracking information to monitor the status of your shipment

          </p>
      </div>
    </div>
    
    </>) }
      

    {i18n.language === "ru" && (<>
  <h1 >Оплата и доставка</h1>
    

    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Наличный расчет</p>
      <div className={styles.policy_item_text}>
          <ul>
            <li> Оплата счета-фактуры (инвойса) в кассе любого украинского банка;</li>
            <li> Отложенная оплата наличными через терминалы самообслуживания ПриватБанка;</li>
            <li> Наличный расчет при курьерской доставке по территории Украины (кроме оккупированных районов).</li>
          </ul>
      </div>
    </div>


    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Платежными картами VISA и MASTERCARD через платежную систему LiqPay</p>
      <div className={styles.policy_item_text}>
         <p>
          Принимаются карты Visa и MasterCard. Вы указываете данные своей кредитной карты только после процесса заказа. Ваш заказ будет обработан немедленно   после его оплаты. Ваши данные будут зашифрованы с использованием процедуры    SSL. Сумма покупки будет списана с вашей платежной карты. <br /> 
          Политика безопасности информации о платежных картах: <br />
          При оплате банковской картой обработка платежа (включая ввод номера карты) происходит на защищенной странице системы обработки. Данные платежной карты передаются к провайдерам платежных услуг только в зашифрованном виде и не хранятся нами. Это означает, что ваша конфиденциальная информация (данные карты, данные регистрации и другие) не попадает к нам; их обработка полностью безопасна, и никто не может получить доступ к вашим личным и банковским данным через наш сервис. Работа с данными карты предусматривает использование стандартов защиты информации, разработанных международными платежными системами Visa и Mastercard - Стандарт безопасности данных платежных карт (PCI DSS), что обеспечивает безопасную обработку данных владельца карты. Технология передачи данных, применяемая, гарантирует безопасность банковских транзакций через использование протоколов Secure Sockets Layer (SSL) и других методов защиты.


         </p>
      </div>
    </div>
    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Apple Pay и Google Pay</p>
      <div className={styles.policy_item_text}>
         <p>
         Вы можете оплатить свой заказ с помощью сервисов Apple Pay и Google Pay. Эти безопасные и удобные методы оплаты обеспечивают беспрепятственный способ завершения покупки. Apple Pay и Google Pay гарантируют безопасность вашей информации и ускоряют процесс оформления оплаты.
         </p>
      </div>
    </div>
    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Оплата в кредит</p>
      <div className={styles.policy_item_text}>
         <p>
         Уточняйте условия покупки в кредит, связавшись с нами.
         </p>
      </div>
    </div>
    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>ДОСТАВКА </p>
      <div className={styles.policy_item_text}>
         <p>
         После оформления заказа и оплаты товара наши сотрудники свяжутся с вами для обсуждения условий и сроков доставки. В большинстве случаев мы отправляем товары в течение 3-5 рабочих дней с момента оплаты. В некоторых случаях, из-за отсутствия готового ремня нужного цвета, выполнение заказа может занять до 7 дней. Кроме того, изготовление индивидуальных заказов может занять до 20 дней. Обратитесь к нашей службе поддержки info@sicvolo.com для уточнения сроков выполнения заказа. Процесс доставки по Украине может занять от 1 до 3 дней. Заказы по Украине отправляем Новой Почтой. Мы делаем все возможное, чтобы наши клиенты получили свои заказы в кратчайшие сроки. Также возможна личная доставка с помощью нашей курьерской службы. Уточняйте информацию относительно доставки через раздел контакты.
         </p>
      </div>
    </div>

   
    
    </>) }


    {i18n.language === "ua" && (<>
  <h1 >Оплата та доставка</h1>
    

    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Готівковий розрахунок</p>
      <div className={styles.policy_item_text}>
          <ul>
            <li> Оплата рахунку-фактури (інвойс) в касі будь-якого українського банку;</li>
            <li> Відкладена оплата готівкою через термінали самообслуговування ПриватБанку;</li>
            <li> Оплата готівкою при кур’єрській доставці по території України (крім окупованих районів).</li>
          </ul>
      </div>
    </div>


    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Платіжними картами VISA і MASTERCARD через платіжну систему LiqPay</p>
      <div className={styles.policy_item_text}>
         <p>
         До оплати приймаються карти Visa і MasterCard. Ви вказуєте дані своєї кредитної карти тільки після процесу замовлення. Ваше замовлення буде оброблено негайно після його оплати. Ваші дані будуть зашифровані за допомогою процедури SSL. Сума покупки буде списана з вашої платіжної картки. <br /> 
         Політика безпеки інформації про платіжні карти: <br />
         При оплаті банківською карткою обробка платежу (включаючи введення номера картки) відбувається на захищеній сторінці системи обробки. Дані платіжної картки передаються до провайдерів платіжних послуг тільки у зашифрованому вигляді і не зберігаються нами. Це означає, що Ваша конфіденційна інформація (дані картки, дані реєстрації та інші) не потрапляє до нас; їх обробка є повністю безпечною, і ніхто не може отримати доступ до Ваших особистих і банківських даних через наш сервіс. Робота з даними картки передбачає використання стандартів захисту інформації, розроблених міжнародними платіжними системами Visa та Mastercard - Стандарт безпеки даних платіжних карт (PCI DSS), що забезпечує безпечну обробку даних власника карти. Технологія передачі даних, що застосовується, гарантує безпеку банківських транзакцій через використання протоколів Secure Sockets Layer (SSL) та інших методів захисту.
         </p>
      </div>
    </div>
    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Apple Pay та Google Pay</p>
      <div className={styles.policy_item_text}>
         <p>
         Ви можете оплатити своє замовлення за допомогою сервісів Apple Pay та Google Pay. Ці безпечні та зручні методи оплати забезпечують безперешкодний спосіб завершення покупки. Apple Pay та Google Pay гарантують безпеку вашої інформації та прискорюють процес оформлення оплати.
         </p>
      </div>
    </div>
    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>Оплата в кредит</p>
      <div className={styles.policy_item_text}>
         <p>
         Уточнюйте умови покупки в кредит зв’язавшись з нами.
         </p>
      </div>
    </div>
    <div className={styles.policy_item}>
      <p className={styles.policy_item_title}>ДОСТАВКА </p>
      <div className={styles.policy_item_text}>
         <p>
         Після оформлення замовлення і оплати товару наші співробітники зв’яжуться з Вами для обговорення умов і строків доставки. У більшості випадків ми відправляємо товари протягом 3 - 5 робочих днів з моменту оплати. У деяких випадках, через відсутність готового ременя потрібного кольору, виконання замовлення може зайняти до 7 днів. Крім того, виготовлення індивідуальних замовлень може зайняти до 20 днів. Звертайтесь до нашої клієнтської підтримки info@sicvolo.com для уточнення строків виконання замовлення. Процес доставки по Україні може займати від 1 до 3 днів. Замовлення по Україні відправляємо Новою Поштою. Ми робимо все можливе, щоб наші клієнти отримали свої замовлення в найкоротший термін. Також може мати місце особиста доставка за допомогою нашої кур'єрської служби. Уточнюйте інформацію щодо доставки через розділ контакти.</p>
      </div>
    </div>

   
    
    </>) }

    </div>
        </>
  
  )
}
