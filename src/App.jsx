import React, { useEffect, useState } from 'react';
import { getArrGoods } from './api';
import './App.scss';
import { Cards } from './Components/Cards/Cards';
import { ModalWindow } from './Components/ModalWindow';

function App() {
  const [arrGoods, setArrGoods] = useState([]);
  const [selectGood, setSelectGood] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getArrGoods()
      .then((result) => result.json())
      .then((result) => setArrGoods(result))
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <div className="app">
      <div className="container">
        <Cards
          arrGoods={arrGoods}
          setSelectGood={setSelectGood}
          setIsOpen={setIsOpen}
        />
        {isOpen ? (
          <ModalWindow
            {...selectGood}
            setIsOpen={setIsOpen}
          />
        ) : ''}
      </div>
    </div>
  );
}

export default App;
