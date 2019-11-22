import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import UserModel, {User} from '../models/UserModel';
import config from '../config';


class AuthService {
    public static generateToken(user: User) {
        const data = {userId: user._id};
        return jwt.sign(data, config.jwt.secret, {expiresIn: config.jwt.expiresIn});
    }

    public static async signUp(user): Promise<any> {
        const {name, password} = user;
        const candidate = await UserModel.findOne({name});
        if(candidate) {
            throw new Error('User with that name already exist');
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userRecord = await UserModel.create({
                name,
                password: hashedPassword
            });
            return {
                _id: userRecord._id,
                name: userRecord.name
            };
        }
    }
}

export default AuthService;