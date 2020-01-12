import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import { User } from '../models/UserModel';
import config from '../config';


class AuthService {
    public static generateToken(user: User) {
        const data = {userId: user._id};
        return jwt.sign(data, config.jwt.secret, {expiresIn: config.jwt.expiresIn});
    }
}

export default AuthService;