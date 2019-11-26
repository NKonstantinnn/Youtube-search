import {handleActions} from 'redux-actions';

import {
    fetchVideosRequest,
    fetchVideosSuccess,
    fetchVideosFailure
} from './actions';

const defaultState = {
    isFetching: false,
    error: null,
    isFirstSearch: true,
    query: "",
    videos: []
};

export default handleActions({
    [fetchVideosRequest]:(state) => {
        return {
            ...state,
            isFetching: true,
            videos: [],
            error: null
        };
    },
    [fetchVideosSuccess]: (state, {payload}) => {
        return {
            ...state,
            error: null,
            isFetching: false,
            isFirstSearch: false,
            videos: payload.videos,
            query: payload.query
        };
    },
    [fetchVideosFailure]: (state, { payload }) => {
        return {
            ...state,
            isFetching: false,
            error: payload
        };
    }

}, defaultState);