import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {setCurrency} from '../../redux/slices/userSlice'

import axios from 'axios'

export default function Convert({usdPrice, oldPrice}) {
    const currency = useSelector(state => state.user.currency)

    const [uah, setUah] = useState(0);
    const [rate, setRate] = useState(42);
    const [old, setOld] = useState(0);


    const [usdRate, setUsdRate] = useState(1);
    const [uahRate, setUahRate] = useState(1);
    const [eurRate, setEurRate] = useState(1);



    // const getRates = async() => {
    //     try{
    //         const res = await axios.get('https://api.monobank.ua/bank/currency')
  
    //          const euro = res.data.filter(obj => (obj.currencyCodeA === 978 && obj.currencyCodeB === 840));
          
    //          const dollar = res.data.filter(obj => (obj.currencyCodeA === 840 && obj.currencyCodeB === 980));
             
    //         console.log(euro);
    //         console.log(dollar);

    //         // const {data} = await axios('https://api.sicvolo.org/wp-json/wp/v2/posts/?include[]=1989');
    //         setUah(dollar[0].rateSell)
        

    //         if(currency === "USD"){setUsdRate(1)}
    //         if(currency === "EUR"){setEurRate(1.111)}
    //         if(currency === "UAH"){setUahRate(41.3)}
    //     }catch(e){
    //         console.log(e);
    //     }
    // }

    useEffect(()=>{
        getRate()
    }, [currency ])

    const getRate = async() => {
        const {data} = await axios.get('https://api.sicvolo.org/wp-json/wp/v2/posts/?include[]=1989');
        console.log(data);
      

        setUsdRate(1)
        setUahRate(data[0].acf.usd_rate)
        setEurRate(data[0].acf.euro_rate)
    }
  


    useEffect(()=>{
        if(oldPrice){ 
           
            if(currency === 'UAH') { setOld((parseFloat(oldPrice) * usdPrice).toFixed(0))}
            if(currency === 'USD') { setOld((parseFloat(oldPrice)).toFixed(0))}
            if(currency === 'EUR') { setOld((parseFloat(oldPrice) * eurRate).toFixed(0))}
          
        } 
    }, [uah, rate, currency])

    console.log(usdPrice, oldPrice);
    console.log(rate);
  return (
    <>
    {currency === 'UAH' && `${(uahRate * usdPrice).toFixed(0)} UAH`}
    {currency === 'USD' && `${usdPrice} USD`}
    {currency === 'EUR' && `${(eurRate * usdPrice).toFixed(2)} EUR`}
        {/* <span className="convertPrice">({(parseFloat(usdPrice) * parseFloat(uah) / rate).toFixed(2)} {currency})</span> */}

     {oldPrice && <span className="oldPrice">{old} {currency}</span>}
    </>
  )
  }