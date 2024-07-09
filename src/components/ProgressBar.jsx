import { useEffect, useState } from "react";

export default function ProgressBar({timer}){
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(()=>{
      const interval = setInterval(()=> {
        console.log('INTERVAL')
        setRemainingTime((prevTime)=> prevTime - 10)
      },10);
    
      return () => {
        console.log('Cleaning up interval');
        clearInterval(interval);
      }
    },[])
    
    return <progress value={remainingTime} max={timer}/>

}


// creato questo componente per ottimizzare il codice:
// in questo modo non viene rieseguito e controllato il codice in DeleteConfirmation ogni 10 ms