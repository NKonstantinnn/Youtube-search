import React from 'react';
import {reduxForm, Field} from 'redux-form';

import SearchInput from '../../components/SearchInput';

import './style.scss';

const SearchForm = () => {
    return (
        <form className="search-form">
            <Field name="query" component={SearchInput} />
        </form>
    );
}

export default reduxForm({ 
    form: 'SearchForm'
})(SearchForm);