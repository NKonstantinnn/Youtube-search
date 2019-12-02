import {reducer as reduxFormReducer} from 'redux-form';
import currentUserReducer from './currentUserReducer';
import signInReducer from './signInReducer';
import searchReducer from './searchReducer';
import appReducer from './appReducer';

export default {
    form: reduxFormReducer,
    currentUser: currentUserReducer,
    signIn: signInReducer,
    search: searchReducer,
    app: appReducer
};
