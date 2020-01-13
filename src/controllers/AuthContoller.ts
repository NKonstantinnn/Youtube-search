import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import BaseController from './BaseController';
import AuthService from '../services/AuthService';
import passport from '../middlewares/Passport';
import UserModel, { User } from '../models/UserModel';
import validate from '../middlewares/validate';
import { SignInValidators, SignUpValidators } from '../validators/AuthValidators';

class AuthController extends BaseController {

    public init() {
        this.router.post(
            '/signup',
            validate(SignUpValidators),
            this.signUp
        );
        this.router.post(
            '/signin', 
            passport.authenticate('local', { failWithError: true }),
            validate(SignInValidators),
            this.signIn,
            this.signInError
        );
        this.router.get(
            '/signout',
            passport.authenticate('jwt', {session: false}),
            this.signOut
        );
    }

    public signInError(err: Error, req: Request, res: Response, next: NextFunction): Response {
        return res.status(401).send(err);
    }

    private async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { login, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = { login, password: hashedPassword };
      
            const dbUser: User = await UserModel.create(user);
            const token = AuthService.generateToken(dbUser);
      
            res.cookie('jwt', token, { httpOnly: true });
            res.status(201).json({ token, message: 'Registration completed', id: dbUser._id });
        }
        catch(err) {
            console.log(err);
            return next(err);
        }
    }

    private async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as User;
            const token = AuthService.generateToken(user);
            res.status(200).json({_id: user._id, token, message: 'Success'});
        }
        catch(err) {
            console.log(err);
            return next(err);
        }
    }

    private async signOut(req: Request, res: Response, next: NextFunction): Promise<void> {
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

export default AuthController;