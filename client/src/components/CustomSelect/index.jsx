import React from 'react';
import PropTypes from 'prop-types';
import {Select} from 'antd';

import './style.scss';

const { Option } = Select;

const CustomSelect = ({
  input,
  options,
  defaultValue
}) => (
    <Select defaultValue={defaultValue} {...input}>
    {
      Object.keys(options).map(value => (
        <Option key={value} value={value}>{options[value]}</Option>
      ))
    }
    </Select>
);

CustomSelect.propTypes = {
    options: PropTypes.object.isRequired,
    defaultValue: PropTypes.string 
};

export default CustomSelect;