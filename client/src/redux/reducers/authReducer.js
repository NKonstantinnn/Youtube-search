import {handleActions} from 'redux-actions';

import {
    fetchAuthRequest,
    fetchAuthSuccess,
    fetchAuthFailure
} from '../actions/authActions';

const defaultState = {
    isFetching: false,
    error: null,
};

export default handleActions({
    [fetchAuthRequest]: (state) => {
        return {
            ...state,
            isFetching: true
        };
    },
    [fetchAuthSuccess]: (state) => {
        return {
            ...state,
            error: null,
            isFetching: false
        };
    },
    [fetchAuthFailure]: (state, { payload }) => {
        return {
            ...state,
            isFetching: false,
            error: payload
        };
    }

}, defaultState);
