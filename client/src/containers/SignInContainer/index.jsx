import React from 'react';

import SignInForm from './containers/SignInForm';

import './style.scss';

const SignInContainer = () => {
    return (
        <div className="sign-in-container">
            <SignInForm />
        </div>
    );
};

export default SignInContainer;