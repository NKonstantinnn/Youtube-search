import React from 'react';
import {reduxForm, Field} from 'redux-form';
import PropTypes from 'prop-types';

import SearchInput from '../../components/SearchInput';

import './style.scss';

const SearchForm = ({handleSubmit, isShowHeart, isPopoverOpen, handleToggleFavouriteQueryModal }) => {
    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <Field 
                name="query" 
                component={SearchInput} 
                isPopoverOpen={isPopoverOpen}
                isShowHeart={isShowHeart}
                handleHeartClick={handleToggleFavouriteQueryModal}
                placeholder="Что хотите посмотреть?" 
            />
            <button type="submit" className="search-form__button">Найти</button>
        </form>
    );
}

SearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isPopoverOpen: PropTypes.bool.isRequired,
    isShowHeart: PropTypes.bool.isRequired,
    handleToggleFavouriteQueryModal: PropTypes.func.isRequired
}

export default reduxForm({ 
    form: 'SearchForm'
})(SearchForm);