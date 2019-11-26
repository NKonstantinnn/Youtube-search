import React from 'react';
import {reduxForm, Field} from 'redux-form';
import PropTypes from 'prop-types';

import CusotomInput from '../../../../components/CustomInput';

import './style.scss';

const SearchForm = ({handleSubmit}) => {
    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <Field 
                name="query" 
                component={CusotomInput} 
                size="large"
                type="text"
                placeholder="Что хотите посмотреть?" 
            />
            <button type="submit" className="search-form__button">Найти</button>
        </form>
    );
}

SearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({ 
    form: 'SearchForm'
})(SearchForm);