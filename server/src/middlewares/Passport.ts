import mongoose from 'mongoose';
import Passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import bcrypt from 'bcryptjs';
import config from '../config';
import UserModel, { User } from '../models/UserModel';

type SerializeUserDone = (err:any, id: mongoose.Types.ObjectId) => void;
type DeserializeUserDone = (err: any, user?: User) => void;
type PassportLocalStrategyDone = (err: any, user?: User, options?: {message: string}) => void;
type PassportJWTStrategyDone = (error: any, user?: User, info?: any) => void;

Passport.serializeUser((user: User, done: SerializeUserDone): void => {
  return done(null, user._id);
});

Passport.deserializeUser(async (id: mongoose.Types.ObjectId, done: DeserializeUserDone): Promise<void> => {
  try {
    const user = await UserModel.findOne(id, {password: false});
    if (!user || !user._id) {
      return done('user not found');
    }
    return done(null, user);
  }
  catch (err) {
    console.log(err);
    done(err);
  }
});

Passport.use(new passportLocal.Strategy({
    usernameField: 'name',
    passwordField: 'password',
  },
  async (name: string, password: string, done: PassportLocalStrategyDone): Promise<void> => {
    try{
      const user = await UserModel.findOne({ name });
      if (!user) {
        return done('Incorrect name or password', null);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return done('Incorrect name or password', null);
      }

      delete user.password;
      return done(null, user);
    }
    catch(err) {
      console.log(err);
      return done(err);
    }
  },
));

const jwtStrategyOpts: passportJWT.StrategyOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

Passport.use(new passportJWT.Strategy(
  jwtStrategyOpts,
  async (jwtPayload: any, done: PassportJWTStrategyDone): Promise<void> => {
    try {
      const user = await UserModel
        .findById(jwtPayload.userId, {password: false})
        .lean();

      if (!user) {
        return done('Unauthorized', null);
      }
      return done(null, user);
    } 
    catch(err) {
      console.log(err);
      return done(err);
    }
  },
));

export default Passport;
