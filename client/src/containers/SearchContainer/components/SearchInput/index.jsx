import React from 'react';
import PropTypes from 'prop-types';
import {Input, Icon, Popover} from 'antd';
import {Link} from 'react-router-dom';

import './style.scss';

const SearchInput = ({input, placeholder, isPopoverOpen, handleHeartClick}) => {

  const popoverContent = (
    <div>
      <p >Поиск сохранен в разделе "Избранное"</p>
      <Link to="/favourite">Перейти в избранное</Link>
    </div>
  );
  
  return (
    <div className="search-input">
      <Input className="search-input__input" {...input} type="text" size="large" placeholder={placeholder} />
      <Popover
        content={popoverContent}
        visible={isPopoverOpen}
        trigger="click"
        placement="bottom"
      >
        <span onClick={handleHeartClick} className="search-input__heart-icon" id="heart-icon">
          <Icon type="heart" />
        </span> 
      </Popover>
    </div>
  );
}

SearchInput.propTypes = {
  isPopoverOpen: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  handleHeartClick: PropTypes.func.isRequired
};

export default SearchInput;