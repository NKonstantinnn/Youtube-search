import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';

import AuthForm from './containers/AuthForm';
import { fetchAuth } from '../../redux/actions/authActions';

import './style.scss';

const AuthContainer = (props) => {
    const handleAuth = (user) => {
        const { isSignUp, history } = props;
        props.fetchAuth(user, isSignUp, history);
    };

    return (
        <div className="auth-container">
            <AuthForm onSubmit={handleAuth} isSignUp={props.isSignUp}/>
        </div>
    );
};

AuthContainer.propTypes = {
    fetchAuth: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    fetchAuth
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(AuthContainer);