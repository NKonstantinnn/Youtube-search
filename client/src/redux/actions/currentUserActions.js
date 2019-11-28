import {createAction} from 'redux-actions';

import userApi from '../../api/userApi';

export const fetchCurrentUserRequest = createAction('FETCH_CURRENT_USER_REQUEST');
export const fetchCurrentUserSuccess = createAction('FETCH_CURRENT_USER_SUCCESS');
export const fetchCurrentUserFailure = createAction('FETCH_CURRENT_USER_FAILURE');

export const addFavouriteQueryRequest = createAction('ADD_FAVOURITE_QUERY_REQUEST');
export const addFavouriteQuerySuccess = createAction('ADD_FAVOURITE_QUERY_SUCCESS');
export const addFavouriteQueryFailure = createAction('ADD_FAVOURITE_QUERY_FAILURE');

export const fetchCurrentUser = (history) => async (dispatch) => {
    try {
        dispatch(fetchCurrentUserRequest());
        if(localStorage.getItem('youtubeToken')) {
            const response = await userApi.getCurrentUser();
            const user = response.data;
            dispatch(fetchCurrentUserSuccess(user));
            history.push('/search');
        }
        else {
            history.push('/signin');
            console.log('Войдите в свой профиль!')
            console.log('Токен не активен');
            dispatch(fetchCurrentUserFailure('Войдите в свой профиль!'));
        }
    }
    catch(err) {
        history.push('/signin');
        console.log(err);
        dispatch(fetchCurrentUserFailure(err));
    }
}

export const addFavouriteQuery = (favouriteQuery) => async (dispatch) => {
    try {
        dispatch(addFavouriteQueryRequest());
        const response = await userApi.addFavouriteQuery(favouriteQuery);
        const newFavouriteQuery = response.data;
        dispatch(addFavouriteQuerySuccess(newFavouriteQuery));
    }
    catch(err) {
        console.log(err);
        dispatch(addFavouriteQueryFailure(err));
    }
}