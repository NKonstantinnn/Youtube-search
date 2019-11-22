import mongoose from'mongoose';
import { prop, Typegoose } from '@typegoose/typegoose';

export class User extends Typegoose {
    public _id: mongoose.Types.ObjectId;

    @prop({required: true})
    public name: string;

    @prop({required: true})
    public password: string
};

const UserModel = new User().getModelForClass(User);

export default UserModel;