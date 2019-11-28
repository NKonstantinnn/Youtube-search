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
}

export default UserService;