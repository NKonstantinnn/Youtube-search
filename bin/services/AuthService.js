"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
class AuthService {
    static generateToken(user) {
        const data = { userId: user._id };
        return jsonwebtoken_1.default.sign(data, config_1.default.jwt.secret, { expiresIn: config_1.default.jwt.expiresIn });
    }
}
exports.default = AuthService;
