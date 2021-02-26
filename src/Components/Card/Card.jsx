import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

export const Card = ({
  name, category, price, setSelectGood, setIsOpen,
}) => {
  const handleEvent = () => {
    setSelectGood({
      name,
      category,
      price,
    });

    setIsOpen(true);
  };

  return (
    <div className="cardGood">
      <div className="wrapperForCatName">
        <div className="cardGood__category cardGood__category_pos_left">{category}</div>
        <div className="cardGood__name cardGood__name_pos_left">{name}</div>
      </div>

      <div className="wrapperForPrice">
        <div className="cardGood__price">
          <sup className="cardGood__price_currency">$</sup>
          {price}
        </div>
        <button type="button" className="btn" onClick={() => handleEvent()}>Buy</button>
      </div>

    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  setSelectGood: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
