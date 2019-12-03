import React from 'react';
import { Card } from 'antd';
import Button from '../../../../components/Button';
import CustomInput from '../../../../components/CustomInput';
import {reduxForm, Field} from 'redux-form';

import './style.scss';

const SignInForm = (props) => {
    const {handleSubmit} = props;
    return (
        <Card className="sign-in-form">
            <img src="/images/logo.png" alt="logo" />
            <h3 className="sign-in-form__title">Вход</h3>
            <form className="sign-in-form__form" onSubmit={handleSubmit}>
                <div className="sign-in-form__form-item">
                    <label className="sign-in-form__label">Логин</label>
                    <Field name="name" type="text" component={CustomInput} />
                </div>
                <div className="sign-in-form__form-item">
                    <label className="sign-in-form__label">Пароль</label>
                    <Field name="password" type="password" component={CustomInput} />
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