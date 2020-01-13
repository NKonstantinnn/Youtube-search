"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("./BaseController"));
const UserService_1 = __importDefault(require("../services/UserService"));
const Passport_1 = __importDefault(require("../middlewares/Passport"));
class UserController extends BaseController_1.default {
    init() {
        this.router.get('/current', Passport_1.default.authenticate('jwt', { session: false }), this.currentUser);
        this.router.post('/favourite', Passport_1.default.authenticate('jwt', { session: false }), this.addFavouriteQuery);
        this.router.put('/favourite', Passport_1.default.authenticate('jwt', { session: false }), this.updateFavouriteQuery);
        this.router.delete('/favourite/:id', Passport_1.default.authenticate('jwt', { session: false }), this.removeFavouriteQuery);
    }
    async currentUser(req, res, next) {
        const { user } = req;
        if (!user) {
            res.sendStatus(401);
        }
        res.json(user);
    }
    async addFavouriteQuery(req, res, next) {
        try {
            const user = req.user;
            const updatedUser = await UserService_1.default.addFavouriteQuery(user._id, req.body);
            res.json(updatedUser.favouriteQueries.pop());
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    }
    async updateFavouriteQuery(req, res, next) {
        try {
            const user = req.user;
            const updatedQuery = await UserService_1.default.updateFavouriteQuery(user._id, req.body);
            res.json(updatedQuery);
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    }
    async removeFavouriteQuery(req, res, next) {
        try {
            const user = req.user;
            const removedId = await UserService_1.default.removeFavouriteQuery(user._id, req.params.id);
            res.json({ _id: removedId });
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    }
}
exports.default = UserController;
