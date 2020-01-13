"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../models/UserModel"));
exports.isUserAlreadyExistsByLogin = async (login) => {
    const user = await UserModel_1.default.findOne({ login });
    if (user) {
        return Promise.reject('Пользователь с таким логином уже существует');
    }
};
