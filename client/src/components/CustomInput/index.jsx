import React from 'react';
import PropTypes from 'prop-types';
import {Input, Icon} from 'antd';

import './style.scss';

const CustomInput = ({
  input,
  type,
  size,
  placeholder,
  meta: { touched, error },
}) => (
  <div
    className="custom-input"
  >
    <Input className="custom-input__input" {...input} type={type} size={size} placeholder={placeholder} />
    {
      (touched && error) && <span className="custom-input__error-msg"><Icon type="warning" />{error}</span>
    }
  </div>
);

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  }).isRequired,
  size: PropTypes.string,
  placeholder: PropTypes.string
};

export default CustomInput;