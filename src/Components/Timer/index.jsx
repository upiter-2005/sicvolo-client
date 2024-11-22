import {useState, useEffect} from 'react'
import Countdown from 'react-countdown';


export default function Timer({gtm}) {

  return (
    <div className="countDownBox">
     <span>Sale ends in:</span> 
      <Countdown date={gtm} className='timer'>
        <p>You are good to go!</p>
      </Countdown>
    </div>
 
 
    
  )
}
