import { body } from 'express-validator';
import bcrypt from 'bcryptjs';

import UserModel from '../models/UserModel';
import { isUserAlreadyExistsByLogin } from '../middlewares/customValidators';

const charactersPattern = /[^0-9a-z_-]/i;   // RegExp to validate the input of valid characters

export const SignUpValidators = [
    body('login').trim(' ')
        .not().isEmpty().withMessage('Введите логин')
        .isLength({max: 20}).withMessage('Длина логина должна быть не более 20 символов')
        .not().matches(charactersPattern).withMessage('Логин содержит недопустимые символы')
        .custom(isUserAlreadyExistsByLogin),
    body('password').trim(' ')
        .not().isEmpty().withMessage('Введите пароль')
        .isLength({min: 6}).withMessage('Длинна пароля должна быть не меньше 6 символов')
        .not().matches(charactersPattern).withMessage('Пароль содержит недопустимые символы')
];

export const SignInValidators = [
    body('login').trim(' ')
        .not().isEmpty().withMessage('Введите логин'),
    body('password').trim(' ')
        .not().isEmpty().withMessage('Введите пароль')
]