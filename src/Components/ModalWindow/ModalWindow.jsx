import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './modalWindow.scss';
import { Form } from '../Form/Form';

export const ModalWindow = ({
  name, category, price, setIsOpen,
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const useMountEffect = (fun) => useEffect(fun, []);

  const useOnOutsideClick = (handleOutsideClick) => {
    const innerBorderRef = useRef();

    const onClick = (event) => {
      if (
        innerBorderRef.current.className === 'modalOverlay'
        && event.target.className === 'modalOverlay'
      ) {
        handleOutsideClick();
      }
    };

    useMountEffect(() => {
      document.addEventListener('click', onClick, true);
      return () => {
        document.removeEventListener('click', onClick, true);
      };
    });

    return { innerBorderRef };
  };

  const { innerBorderRef } = useOnOutsideClick(() => {
    setIsOpen(false);
  });

  return (
    <div className="modalOverlay" ref={innerBorderRef}>
      <div className="modalWindow">
        <div className="wrapperForCatNamePrice__pos_margin_top">
          <div className="cardGood__category">{category}</div>
          <div className="cardGood__name">{name}</div>
          <div className="cardGood__price">
            <sup className="cardGood__price_currency">$</sup>
            {price}
          </div>
        </div>
        <Form setIsOpen={setIsOpen} />
        <button type="button" className="btnClose" aria-label="Close" onClick={() => closeModal()}>
          <span className="btnClose__content">&times;</span>
        </button>
      </div>
    </div>
  );
};

ModalWindow.defaultProps = {
  name: '',
  category: '',
  price: 0,
};

ModalWindow.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number,
  setIsOpen: PropTypes.func.isRequired,
};
