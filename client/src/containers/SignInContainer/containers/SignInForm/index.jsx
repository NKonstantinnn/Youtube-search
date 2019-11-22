import React from 'react';
import { Card, Input, Button } from 'antd';

import './style.scss';

const SignInForm = () => {
    return (
        <Card className="sign-in-form">
            <img src="/images/logo.png" alt="logo" />
            <h3 className="sign-in-form__title">Вход</h3>
            <form className="sign-in-form__form">
                <div className="sign-in-form__form-item">
                    <label className="sign-in-form__label">Логин</label>
                    <Input className="sign-in-form__input" />
                </div>
                <div className="sign-in-form__form-item">
                    <label className="sign-in-form__label">Пароль</label>
                    <Input className="sign-in-form__input" type="password" />
                </div>
                <Button className="sign-in-form__button" type="primary">Войти</Button>
            </form>
        </Card>
    );
}
export default SignInForm;