import {handleActions} from 'redux-actions';

const defaultState = {
    isFetching: false,
    error: null,
    isAuth: false,
    user: null
};

export default handleActions({

}, defaultState);