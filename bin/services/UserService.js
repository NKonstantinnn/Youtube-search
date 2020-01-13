"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../models/UserModel"));
class UserService {
    static async addFavouriteQuery(userId, favouriteQuery) {
        const user = await UserModel_1.default
            .findByIdAndUpdate(userId, { $push: { favouriteQueries: favouriteQuery } }, { new: true })
            .select({ password: false })
            .lean();
        return user;
    }
    static async updateFavouriteQuery(userId, favouriteQuery) {
        const { query, name, order, maxResults } = favouriteQuery;
        await UserModel_1.default.updateOne({ _id: userId, 'favouriteQueries._id': favouriteQuery._id }, { $set: {
                'favouriteQueries.$.query': query,
                'favouriteQueries.$.name': name,
                'favouriteQueries.$.order': order,
                'favouriteQueries.$.maxResults': maxResults
            }
        });
        return favouriteQuery;
    }
    static async removeFavouriteQuery(userId, queryId) {
        await UserModel_1.default.update({ _id: userId }, { $pull: { 'favouriteQueries': { _id: queryId } } });
        return queryId;
    }
}
exports.default = UserService;
