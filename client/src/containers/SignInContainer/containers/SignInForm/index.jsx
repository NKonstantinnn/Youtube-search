import React from 'react';
import { Card } from 'antd';
import Button from '../../../../components/Button';
import CustomInput from '../../../../components/CustomInput';
import {reduxForm, Field} from 'redux-form';

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

const SignInForm = (props) => {
    const {handleSubmit} = props;
    return (
        <Card className="sign-in-form">
            <img src="/images/logo.png" alt="logo" />
            <h3 className="sign-in-form__title">Вход</h3>
            <form className="sign-in-form__form" onSubmit={handleSubmit}>
                <div className="sign-in-form__form-item">
                    <label className="sign-in-form__label">Логин</label>
                    <Field className="sign-in-form__input" name="name" type="text" component={CustomInput} />
                </div>
                <div className="sign-in-form__form-item">
                    <label className="sign-in-form__label">Пароль</label>
                    <Field className="sign-in-form__input" name="password" type="password" component={CustomInput} />
                </div>
                <Button 
                    className="sign-in-form__button" 
                    type="submit"
                >
                    Войти
                </Button>
            </form>
        </Card>
    );
}
export default reduxForm({ 
    form: 'SignInForm'
})(SignInForm);