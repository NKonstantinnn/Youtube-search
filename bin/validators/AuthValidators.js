"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidators_1 = require("../middlewares/customValidators");
const charactersPattern = /[^0-9a-z_-]/i;
exports.SignUpValidators = [
    express_validator_1.body('login').trim(' ')
        .not().isEmpty().withMessage('Введите логин')
        .isLength({ max: 20 }).withMessage('Длина логина должна быть не более 20 символов')
        .not().matches(charactersPattern).withMessage('Логин содержит недопустимые символы')
        .custom(customValidators_1.isUserAlreadyExistsByLogin),
    express_validator_1.body('password').trim(' ')
        .not().isEmpty().withMessage('Введите пароль')
        .isLength({ min: 6 }).withMessage('Длинна пароля должна быть не меньше 6 символов')
        .not().matches(charactersPattern).withMessage('Пароль содержит недопустимые символы')
];
exports.SignInValidators = [
    express_validator_1.body('login').trim(' ')
        .not().isEmpty().withMessage('Введите логин'),
    express_validator_1.body('password').trim(' ')
        .not().isEmpty().withMessage('Введите пароль')
];
