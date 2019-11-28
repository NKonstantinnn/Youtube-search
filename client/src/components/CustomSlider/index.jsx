import React from 'react';
import PropTypes from 'prop-types';
import {Slider, InputNumber} from 'antd';

import './style.scss';

const CustomSlider = (props) => {
    const {min, max, input: {value, onChange}} = props;

    const handleChangeValue = (e) => {
        onChange(typeof e === 'number' ? e : 0);
    }

    return (
        <div className="custom-slider">
            <Slider className="custom-slider__slider" min={min} max={max} value={value} onChange={handleChangeValue} />
            <InputNumber className="custom-slider__input" min={min} max={max} value={value} onChange={handleChangeValue} />
        </div>
    );
}

CustomSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
}

export default CustomSlider;