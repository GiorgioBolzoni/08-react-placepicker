import { useEffect } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {

useEffect(() => {

  const timer = setTimeout(()=>{
    onConfirm();
  }, 3000);

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
      </div>
    </div>
  );
}
