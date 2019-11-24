import {reducer as reduxFormReducer} from 'redux-form';
import currentUserReducer from './currentUserReducer';
import signInReducer from '../../SignInContainer/redux/reducer';

export default {
    form: reduxFormReducer,
    currentUser: currentUserReducer,
    signIn: signInReducer
};
