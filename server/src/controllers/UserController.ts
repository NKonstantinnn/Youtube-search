import {Request, Response, NextFunction} from 'express';

import BaseController from './BaseController';
import UserService from '../services/UserService';
import passport from '../middlewares/Passport';
import {User} from '../models/UserModel';

class UserController extends BaseController {

    public init() {
        this.router.post(
            '/favourite',
            passport.authenticate('jwt', {session: false}),
            this.addFavouriteQuery
        );
    }

    private async addFavouriteQuery(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as User;
            const updatedUser = await UserService.addFavouriteQuery(user._id, req.body);
            res.json(updatedUser);
        }
        catch(err) {
            console.log(err);
            return next(err);
        }
    }
}

export default UserController;