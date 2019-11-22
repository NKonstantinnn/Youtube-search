import {Request, Response, NextFunction} from 'express';

import BaseController from './BaseController';
import AuthService from '../services/AuthService';
import passport from '../middlewares/Passport';
import {User} from '../models/UserModel';

class AuthController extends BaseController {

    public init() {
        this.router.post(
            '/signup',
            this.signUp
        );
        this.router.post(
            '/signin', 
            passport.authenticate('local'),
            this.signIn
        );
        this.router.get(
            '/signout',
            passport.authenticate('jwt', {session: false}),
            this.signOut
        );
        this.router.get(
            '/current',
            passport.authenticate('jwt', {session: false}),
            this.currentUser
        )
    }

    private async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await AuthService.signUp(req.body);
            res.status(201).json({...user, msg: 'Success'});
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

    private async currentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { user } = req;
        if(!user) {
            res.sendStatus(401);
        }
        res.json(user);
    } 
}

export default AuthController;