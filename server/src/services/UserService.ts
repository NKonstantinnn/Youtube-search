import { FavouriteQuery } from './../models/FavouriteQueryModel';
import UserModel, {User} from '../models/UserModel';
import config from '../config';


class UserService {
    public static async addFavouriteQuery(userId, favouriteQuery): Promise<User> {
        const user = await UserModel
            .findByIdAndUpdate(userId, { $push: {favouriteQueries: favouriteQuery} }, {new: true})
            .select({password: false})
            .lean();
        
        return user;
    }

    public static async updateFavouriteQuery(userId, favouriteQuery): Promise<FavouriteQuery> {
        const { query, name, order, maxResults } = favouriteQuery;
        await UserModel.updateOne(
            { _id: userId, 'favouriteQueries._id': favouriteQuery._id },
            { $set: { 
                    'favouriteQueries.$.query': query,
                    'favouriteQueries.$.name': name,
                    'favouriteQueries.$.order': order,
                    'favouriteQueries.$.maxResults': maxResults 
                } 
            },
        );
        return favouriteQuery;
    }
}

export default UserService;