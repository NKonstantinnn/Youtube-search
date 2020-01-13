import mongoose from 'mongoose'
import {prop, arrayProp, Typegoose} from 'typegoose';

import {FavouriteQuery} from './FavouriteQueryModel';

export class User extends Typegoose {
    public _id: mongoose.Types.ObjectId;

    @prop({required: true})
    public login: string;

    @prop({required: true})
    public password: string;
    

    @arrayProp({ items: FavouriteQuery })
    favouriteQueries?: FavouriteQuery[];
}

const UserModel = new User().getModelForClass(User);

export default UserModel;
