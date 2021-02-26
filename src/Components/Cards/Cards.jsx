import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '../Card';
import './cards.scss';

export const Cards = ({ arrGoods, setSelectGood, setIsOpen }) => {
  const choseGoodCheapest = () => {
    const goodCheapest = arrGoods.reduce((prefGood, currentGood) => (
      currentGood.price < prefGood.price ? currentGood : prefGood
    ));
    setSelectGood(goodCheapest);
    setIsOpen(true);
  };

  return (
    <>
      <ul className="cards__list">
        {arrGoods.map((good) => (
          <li key={uuidv4()}>
            <Card
              {...good}
              setSelectGood={setSelectGood}
              setIsOpen={setIsOpen}
            />
          </li>
        ))}
      </ul>

      <button type="button" className="btn btn_large btn_large_margin_top" id="btnBuyCheapest" onClick={choseGoodCheapest}> Buy cheapest </button>
    </>
  );
};

Cards.propTypes = {
  arrGoods: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  setSelectGood: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
