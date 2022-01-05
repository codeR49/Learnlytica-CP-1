import React from 'react';
import { FiClock } from 'react-icons/fi';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div>

      <div style={{fontSize: '30px'}}>
          <FiClock style={{marginTop:"-10px", fontSize:"25px" , marginRight:"10px"}}/>
      <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
  
    </div>
  );
}
export default function Timer() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 10800); // 3 hours timer
    return (
      <div>
        <MyTimer expiryTimestamp={time} />
      </div>
    );
  }