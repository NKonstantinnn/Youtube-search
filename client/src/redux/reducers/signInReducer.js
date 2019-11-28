import {handleActions} from 'redux-actions';

import {
    fetchSignInRequest,
    fetchSignInSuccess,
    fetchSignInFailure
} from '../actions/signInActions';

const defaultState = {
    isFetching: false,
    error: null,
};

export default handleActions({
    [fetchSignInRequest]:(state) => {
        return {
            ...state,
            isFetching: true
        };
    },
    [fetchSignInSuccess]: (state) => {
        return {
            ...state,
            error: null,
            isFetching: false
        };
    },
    [fetchSignInFailure]: (state, { payload }) => {
        return {
            ...state,
            isFetching: false,
            error: payload
        };
    }

}, defaultState);