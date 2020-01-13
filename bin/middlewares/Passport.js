"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
passport_1.default.serializeUser((user, done) => {
    return done(null, user._id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel_1.default.findOne(id, { password: false });
        if (!user || !user._id) {
            return done('user not found');
        }
        return done(null, user);
    }
    catch (err) {
        console.log(err);
        done(err);
    }
});
passport_1.default.use(new passport_local_1.default.Strategy({
    usernameField: 'login',
    passwordField: 'password',
}, async (login, password, done) => {
    try {
        const user = await UserModel_1.default.findOne({ login });
        if (!user) {
            return done('Неверный логин или пароль', null);
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return done('Неверный логин или пароль', null);
        }
        delete user.password;
        return done(null, user);
    }
    catch (err) {
        console.log(err);
        return done(err);
    }
}));
const jwtStrategyOpts = {
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.jwt.secret,
};
passport_1.default.use(new passport_jwt_1.default.Strategy(jwtStrategyOpts, async (jwtPayload, done) => {
    try {
        const user = await UserModel_1.default
            .findById(jwtPayload.userId, { password: false })
            .lean();
        if (!user) {
            return done('Ошибка авторизации', null);
        }
        return done(null, user);
    }
    catch (err) {
        console.log(err);
        return done(err);
    }
}));
exports.default = passport_1.default;
