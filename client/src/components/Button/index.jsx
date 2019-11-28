import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Button = (props) => {
    const {children, className, outline, ...other} = props;
    return (
        <button {...other} className={`button ${outline ? "button_outline" : ""} ${className}`}>
            {children}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    outline: PropTypes.bool
}


export default Button;