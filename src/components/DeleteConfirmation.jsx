import { useEffect, useState } from "react";

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
const [remainingTime, setRemainingTime] = useState(TIMER);

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


useEffect(() => {

  const timer = setTimeout(()=>{
    onConfirm();
  }, TIMER);

  // funzione di pulizia: rimuove il timer ogni volta che tutto questo codice viene rimosso dal DOM
  return () => {
    console.log('Cleaning up timer');
    clearTimeout(timer);
  }
}, [onConfirm]); // aggiungere onConfirm come dipendenza può essere un problema perchè è una funzione: rischio di loop infinito(necessario useCallback Hook) perchè handleRemovePlace viene ricreata più volte e onConfirm non sarà sempre la stessa

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
        <progress value={remainingTime} max={TIMER}/>
      </div>
    </div>
  );
}
