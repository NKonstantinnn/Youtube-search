import {reducer as reduxFormReducer} from 'redux-form';
import currentUserReducer from './currentUserReducer';
import signInReducer from './signInReducer';
import searchReducer from './searchReducer';

export default {
    form: reduxFormReducer,
    currentUser: currentUserReducer,
    signIn: signInReducer,
    search: searchReducer
};
