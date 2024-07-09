import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children }) {
  const dialog = useRef();

useEffect(()=>{
  if(open){
    dialog.current.showModal();
  }else{
    dialog.current.close();
  }
}, [open]); // in questo caso servono le dipendenze perchè questo codice viene rieseguito quando cambiano le dipendenze (apri/chiudi modale in base se open è true o false)

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
