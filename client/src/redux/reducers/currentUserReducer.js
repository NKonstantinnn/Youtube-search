import {handleActions} from 'redux-actions';
import {
    fetchCurrentUserRequest,
    fetchCurrentUserSuccess,
    fetchCurrentUserFailure,
    addFavouriteQueryRequest,
    addFavouriteQuerySuccess,
    addFavouriteQueryFailure,
    editFavouriteQueryRequest,
    editFavouriteQuerySuccess,
    editFavouriteQueryFailure
} from '../actions/currentUserActions';

const transformFavouriteQueries = (queries, query) => {
    const idx = queries.findIndex((el) => el._id === query._id);
    if(idx !== -1) {
        return [
            ...queries.slice(0, idx), 
            query,
            ...queries.slice(idx + 1)
        ];
    }

    return [...queries, query];
}

const defaultState = {
    isFetching: false,
    error: null,
    isAuth: false,
    user: null,
    isQueryFetching: false
};

export default handleActions({
    [fetchCurrentUserRequest]: (state) => {
        return {
            ...state,
            isFetching: true,
            error: null
        };
    },
    [fetchCurrentUserSuccess]: (state, {payload}) => {
        return {
            ...state,
            user: payload,
            isAuth: true,
            isFetching: false,
        }
    },
    [fetchCurrentUserFailure]: (state, {payload}) => {
        return {
            ...state,
            error: payload,
            isFetching: false
        }
    },
    [addFavouriteQueryRequest]: (state) => {
        return {
            ...state,
            isQueryFetching: true,
            error: null
        };
    },
    [addFavouriteQuerySuccess]: (state, {payload}) => {
        return {
            ...state,
            isQueryFetching: false,
            user: {
                ...state.user,
                favouriteQueries: transformFavouriteQueries(state.user.favouriteQueries, payload)

            }
        }
    },
    [addFavouriteQueryFailure]: (state, {payload}) => {
        return {
            ...state,
            error: payload,
            isQueryFetching: false
        }
    },
    [editFavouriteQueryRequest]: (state) => {
        return {
            ...state,
            isQueryFetching: true,
            error: null
        };
    },
    [editFavouriteQuerySuccess]: (state, {payload}) => {
        return {
            ...state,
            isQueryFetching: false,
            user: {
                ...state.user,
                favouriteQueries: transformFavouriteQueries(state.user.favouriteQueries, payload)

            }
        }
    },
    [editFavouriteQueryFailure]: (state, {payload}) => {
        return {
            ...state,
            error: payload,
            isQueryFetching: false
        }
    },

}, defaultState);