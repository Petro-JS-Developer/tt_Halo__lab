import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ReactComponent as CloseIcon } from '../../assets/images/close.svg';
import './form.scss';

const initialValueErrorMessage = {
  requiredField: '',
  onlyLetters: '',
  onlyNumbers: '',
  minLength12: '',
};

export const Form = ({ setIsOpen }) => {
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputPhoneValue, setInputPhoneValue] = useState('');
  const [isInputNameFocus, setIsInputNameFocus] = useState(false);
  const [isInputPhoneFocus, setIsInputPhoneFocus] = useState(false);

  const [currentField, setCurrentField] = useState('');
  const [currentError, setCurrentError] = useState('');
  const [messagesError, setMessagesError] = useState(initialValueErrorMessage);

  const isInitialMount = useRef(true);

  const validateName = () => {
    if (!inputNameValue) {
      setMessagesError({ ...messagesError, requiredField: 'This field in required' });
      setCurrentField('userName');
      setCurrentError('requiredField');
      return false;
    }

    if (!/^[A-Za-z]+$/.test(inputNameValue)) {
      setMessagesError({ ...messagesError, onlyLetters: 'Only letters allowed' });
      setCurrentField('userName');
      setCurrentError('onlyLetters');
      return false;
    }

    setMessagesError(initialValueErrorMessage);
    setCurrentField('');
    setCurrentError('');
    return true;
  };

  const validatePhone = () => {
    if (!inputPhoneValue && !isInputPhoneFocus) {
      setMessagesError({ ...messagesError, requiredField: 'This field in required' });
      setCurrentField('phone');
      setCurrentError('requiredField');
      return false;
    }

    if (!/^\d+$/.test(inputPhoneValue) && !isInputPhoneFocus) {
      setMessagesError({ ...messagesError, onlyNumbers: 'Only numbers allowed' });
      setCurrentField('phone');
      setCurrentError('onlyNumbers');
      return false;
    }

    if ((inputPhoneValue.length > 12 || inputPhoneValue.length < 12) && !isInputPhoneFocus) {
      setMessagesError({ ...messagesError, minLength12: 'Should contain 12 characters' });
      setCurrentField('phone');
      setCurrentError('minLength12');
      return false;
    }

    setMessagesError(initialValueErrorMessage);
    setCurrentField('');
    setCurrentError('');
    return true;
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const { userName, phone } = event.target;
    const isFilValidName = validateName();
    const isFilValidPhone = validatePhone();

    if (isFilValidName && isFilValidPhone) {
      console.log(userName.value, phone.value);
      setInputNameValue('');
      setInputPhoneValue('');
      setIsOpen(false);
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!isInputNameFocus) {
        validateName();
      }

      if (!isInputPhoneFocus && validateName()) {
        validatePhone();
      }

      if (isInputNameFocus || isInputPhoneFocus) {
        setMessagesError(initialValueErrorMessage);
        setCurrentField('');
        setCurrentError('');
      }
    }
  }, [isInputNameFocus, isInputPhoneFocus]);

  return (
    <form onSubmit={formSubmit} className="formBuy" noValidate>
      <div className="wrapperInputName">
        <div className="tooltipUp">
          {currentField === 'userName' && <p className="tooltipUp__title">Error</p>}
          {currentField === 'userName' && (
            <p className="btnClose tooltipUp__btn_red">
              <span className="btnClose__content fz_20px">&times;</span>
            </p>
          )}
        </div>
        <input
          type="text"
          name="userName"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          // autoFocus
          className={classnames('formBuy__input formBuy__input_name', !isInputNameFocus && (currentField === 'userName' && currentError ? 'invalid' : 'valid'))}
          placeholder="Name"
          onChange={(event) => setInputNameValue(event.target.value)}
          value={inputNameValue}
          onFocus={() => setIsInputNameFocus(true)}
          onBlur={() => setIsInputNameFocus(false)}
        />
        <div className="tooltipDown">
          {currentField === 'userName' && (
            <p className="tooltipDown__text">
              {messagesError[currentError]}
            </p>
          )}
        </div>
      </div>
      <div className="wrapperInputPhone">
        <div className="tooltipUp">
          {currentField === 'phone' && <p className="tooltipUp__title">Error</p>}
          {currentField === 'phone' && (
            <p className="btnClose tooltipUp__btn_red">
              <span className="btnClose__content fz_20px">&times;</span>
            </p>
          )}
        </div>
        <input
          type="tel"
          name="phone"
          className={classnames('formBuy__input formBuy__input_phone', !isInputPhoneFocus && (currentField === 'phone' && currentError ? 'invalid marginZero' : 'valid'))}
          placeholder="Number"
          onChange={(event) => setInputPhoneValue(event.target.value)}
          value={inputPhoneValue}
          onFocus={() => setIsInputPhoneFocus(true)}
          onBlur={() => setIsInputPhoneFocus(false)}
        />
        <div className="tooltipDown">
          {currentField === 'phone' && (
            <p className="tooltipDown__text">
              {messagesError[currentError]}
            </p>
          )}
        </div>
      </div>
      <button type="submit" className="btn formBuy__input formBuy__input_order btn-arrow">
        <span>
          Order
          <CloseIcon />
        </span>
      </button>
    </form>
  );
};

Form.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
