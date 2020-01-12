import {handleActions} from 'redux-actions';

import {
    fetchVideosRequest,
    fetchVideosSuccess,
    fetchVideosFailure,
    setIsSearchDefaulted,
    resetSearch
} from '../actions/searhActions';

const defaultState = {
    isFetching: false,
    error: null,
    query: "",
    isSearchDefaulted: true,
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
    },
    [setIsSearchDefaulted]: (state, { payload }) => {
        return {
            ...state,
            isSearchDefaulted: payload
        };
    },
    [resetSearch]: (state) => defaultState,

}, defaultState);