import { useRef, useState, useEffect } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from './loc.js';


const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storeIds.map(id => AVAILABLE_PLACES.find((place)=>place.id === id)); // restituisce un array di oggetti basati sul local storage di storeIds (riga precedente)
function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);  

  // useEffect viene eseguito dopo l'esecuzione di ogni componente e non crea il loop
useEffect(() => {
  navigator.geolocation.getCurrentPosition((position)=> {
    const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);

    setAvailablePlaces(sortedPlaces);
  }); 

  }, []);
// [] è un array vuoto di dipendenze, quando queste dipendenze non cambiano non viene rieseguito il codice del primo elemento, ovvero navigator.geolocation.getCurrentPosition.... Essendo vuoto l'array, le dipendenze non possono cambiare, quindi niente loop


  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    // NB: quello che segue è sempre un Side Effect ma non posso utilizzare useEffect perchè gli Hooks non possono essere utilizzati all'interno di altre funzioni annidate (qui è handleSelectPlace()), ma solo nel root di App (vedi l'esempio in cui si reperisce la posizione dell'utente). Inoltre non si crea loop perchè viene eseguito solo quando viene eseguita la funzione

    // Salva nel local storage i luoghi selezionati anche se ricarico la pagina, è fornito anche questo dal browser
    const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []; // trasforma stringa in array
    if (storeIds.indexOf(id) === -1){
    localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storeIds])); // trasforma nuovamente array in stringa
    }
    //if x assicurarmi di non salvare più volte il place con lo stesso id: -1 indica che non è ancora lì dentro
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();

    const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storeIds.filter((id)=> id!== selectedPlace.current))); 
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
