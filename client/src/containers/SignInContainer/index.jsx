import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';

import SignInForm from './containers/SignInForm';
import {fetchSignIn} from './redux/actions';

import './style.scss';

const SignInContainer = (props) => {

    const handleSignIn = (user) => {
        const {history} = props;
        props.fetchSignIn(user, history);
    }

    return (
        <div className="sign-in-container">
            <SignInForm onSubmit={handleSignIn} />
        </div>
    );
};

SignInContainer.propTypes = {
    fetchSignIn: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    fetchSignIn
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(SignInContainer);