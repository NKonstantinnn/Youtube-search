import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import { Link } from 'react-router-dom';

import Button from '../../../../components/Button';
import CustomInput from '../../../../components/CustomInput';

import './style.scss';

// const validate = (values) => {
//     const charactersPattern = /[^0-9a-z_-]/i;   // RegExp to validate the input of valid characters
//     const errors = {}
//     //--- Name check ---
//     // check name for emptiness
//     if (!values.name) {
//         errors.name = 'Введите логин';
//     }
//     // check name for emptiness with space
//     else if (values.name.trim() === '') {
//         errors.name = 'Введите логин';
//     }
//     // check name for compliance with the pattern
//     else if (!charactersPattern.test(values.name.trim())) {
//         errors.name = 'Логин содержит недопустимые символы';
//     }

//     //--- Password check ---
//     // check password for emptiness
//     if (!values.password) {
//         errors.password = 'Введите пароль';
//     }
//     // check password for emptiness with space
//      else if (values.password.trim() === '') {
//         errors.name = 'Введите пароль';
//     }
//     // check password min length 
//     else if (values.password.length < 6) {
//         errors.password = 'Длинна пароля должна быть не меньше 6 символов';
//     }
//     // check password for compliance with the pattern
//     else if(!charactersPattern.test(values.password.trim())) {
//         errors.name='Пароль содержит недопустимые символы';
//     }
//     return errors
// }

const AuthForm = (props) => {
    const { handleSubmit, isSignUp } = props;
    return (
        <Card className="auth-form">
            <img className="auth-form__logo" src="/images/logo.png" alt="logo" />
            <h3 className="auth-form__title">{isSignUp ? 'Регистрация' : 'Вход'}</h3>
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__form-item">
                    <label className="auth-form__label">Логин</label>
                    <Field name="login" type="text" component={CustomInput} />
                </div>
                <div className="auth-form__form-item">
                    <label className="auth-form__label">Пароль</label>
                    <Field name="password" type="password" component={CustomInput} />
                </div>
                <Link className="auth-form__link" to={isSignUp ? '/signin' : '/signup'}>
                    Перейти на страницу {isSignUp ? 'авторизации' : 'регистрации'}
                </Link>
                <Button 
                    className="auth-form__button" 
                    type="submit"
                >
                    {isSignUp ? 'Зарегистрироваться' : 'Войти'}
                </Button>
            </form>
        </Card>
    );
}

AuthForm.propTypes = {
    isSignUp: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ 
    form: 'SignInForm'
})(AuthForm);