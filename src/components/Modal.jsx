import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
  const dialog = useRef();

useEffect(()=>{
  if(open){
    dialog.current.showModal();
  }else{
    dialog.current.close();
  }
}, [open]); // in questo caso servono le dipendenze perchè questo codice viene rieseguito quando cambiano le dipendenze (apri/chiudi modale in base se open è true o false)

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
// The <dialog> element can also be closed by pressing the ESC key on the keyboard. In that case, the dialog will disappear but the state passed to the open prop (i.e., the modalIsOpen state) will not be set to false.

// Therefore, the modal can't be opened again (because modalIsOpen still is true - the UI basically now is not in sync with the state anymore).