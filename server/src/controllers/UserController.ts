import {Request, Response, NextFunction} from 'express';

import BaseController from './BaseController';
import UserService from '../services/UserService';
import passport from '../middlewares/Passport';
import {User} from '../models/UserModel';

class UserController extends BaseController {

    public init() {
        this.router.get(
            '/current',
            passport.authenticate('jwt', {session: false}),
            this.currentUser
        )
        this.router.post(
            '/favourite',
            passport.authenticate('jwt', {session: false}),
            this.addFavouriteQuery
        );
        this.router.put(
            '/favourite',
            passport.authenticate('jwt', {session: false}),
            this.updateFavouriteQuery
        );
        this.router.delete(
            '/favourite/:id',
            passport.authenticate('jwt', {session: false}),
            this.removeFavouriteQuery
        );
    }

    private async currentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { user } = req;
        if(!user) {
            res.sendStatus(401);
        }
        res.json(user);
    } 

    private async addFavouriteQuery(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as User;
            const updatedUser = await UserService.addFavouriteQuery(user._id, req.body);
            res.json(updatedUser.favouriteQueries.pop());
        }
        catch(err) {
            console.log(err);
            return next(err);
        }
    }

    private async updateFavouriteQuery(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as User;
            const updatedQuery = await UserService.updateFavouriteQuery(user._id, req.body);
            res.json(updatedQuery);
        }
        catch(err) {
            console.log(err);
            return next(err);
        }
    }

    private async removeFavouriteQuery(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as User;
            const removedId = await UserService.removeFavouriteQuery(user._id, req.params.id);
            res.json({_id: removedId});
        }
        catch(err) {
            console.log(err);
            return next(err);
        }
    }
}

export default UserController;