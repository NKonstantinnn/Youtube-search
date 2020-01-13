import {reducer as reduxFormReducer} from 'redux-form';
import currentUserReducer from './currentUserReducer';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import appReducer from './appReducer';

export default {
    form: reduxFormReducer,
    currentUser: currentUserReducer,
    auth: authReducer,
    search: searchReducer,
    app: appReducer
};
