import React from 'react';

import './style.scss';

const Button = (props) => {
    const {children, className, ...other} = props;
    return (
        <button {...other} className={`btn ${className}`}>
            {children}
        </button>
    );
}

export default Button;