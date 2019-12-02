import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Input, Icon} from 'antd';

import './style.scss';

const CustomInput = ({input, size, type, placeholder, disabled }) => {
  const [inputType, setInputType] = useState('text');

  const changeInputType = (type) => {
    if(type) {
      setInputType(type);
    }
    else {
      setInputType(
        (prev) => (prev === 'text' ? 'password' : 'text')
      );
    }
  }

  useEffect(() => {
    changeInputType(type)
  }, [type]);

  return (
    <div
      className="custom-input"
    >
      <Input className="custom-input__input" {...input} 
        type={inputType} size={size} placeholder={placeholder} disabled={disabled} />
      {
        (type === "password") && (
          <span className="custom-input__password-icon" onClick={() => changeInputType()}>
            <Icon type={inputType === 'password' ? 'eye-invisible' : 'eye'} />
          </span>
        )
      }
    </div>
  );
}

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  }).isRequired,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

export default CustomInput;