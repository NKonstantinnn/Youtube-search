import React from 'react';
import {Input} from 'antd';

import './style.scss';

const SearchInput = ({input}) => {
    return (
        <div className="search-input">
            <Input 
                {...input}
                className="search-input__input"  
                type="text" 
                size="large" 
                placeholder="Что хотите посмотреть?" 
            />
            <button className="search-input__button">Найти</button>
        </div>
    );
}

export default SearchInput;