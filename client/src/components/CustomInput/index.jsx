import React from 'react';
import PropTypes from 'prop-types';
import {Input, Icon} from 'antd';

import './style.scss';

const CustomInput = ({
  input,
  type,
  meta: { touched, error },
}) => (
  <div
    className="custom-input"
  >
    <Input className="custom-input__input" {...input} type={type} />
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
};

export default CustomInput;