"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const BaseController_1 = __importDefault(require("./BaseController"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const Passport_1 = __importDefault(require("../middlewares/Passport"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const AuthValidators_1 = require("../validators/AuthValidators");
class AuthController extends BaseController_1.default {
    init() {
        this.router.post('/signup', validate_1.default(AuthValidators_1.SignUpValidators), this.signUp);
        this.router.post('/signin', Passport_1.default.authenticate('local', { failWithError: true }), validate_1.default(AuthValidators_1.SignInValidators), this.signIn, this.signInError);
        this.router.get('/signout', Passport_1.default.authenticate('jwt', { session: false }), this.signOut);
    }
    signInError(err, req, res, next) {
        return res.status(401).send(err);
    }
    async signUp(req, res, next) {
        try {
            const { login, password } = req.body;
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const user = { login, password: hashedPassword };
            const dbUser = await UserModel_1.default.create(user);
            const token = AuthService_1.default.generateToken(dbUser);
            res.cookie('jwt', token, { httpOnly: true });
            res.status(201).json({ token, message: 'Registration completed', id: dbUser._id });
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    }
    async signIn(req, res, next) {
        try {
            const user = req.user;
            const token = AuthService_1.default.generateToken(user);
            res.status(200).json({ _id: user._id, token, message: 'Success' });
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    }
    async signOut(req, res, next) {
        try {
            req.user = null;
            res.status(200).json('Signed out');
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    }
}
exports.default = AuthController;
