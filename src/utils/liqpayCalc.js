import axios from 'axios'

export const liqpayCalc = async(sum) =>{
    console.log(sum);

        const {data} = await axios.get('https://api.sicvolo.org/wp-json/wp/v2/posts/?include[]=1989');
    console.log(data);
        const res = (sum * parseFloat(data[0].acf.usd_rate) ).toFixed(0)
        console.log(data[0].acf.usd_rate);
        console.log(res);
        return res;
      
           

         
} 




