import {createAction} from 'redux-actions';

import userApi from '../../api/userApi';

export const fetchCurrentUserRequest = createAction('FETCH_CURRENT_USER_REQUEST');
export const fetchCurrentUserSuccess = createAction('FETCH_CURRENT_USER_SUCCESS');
export const fetchCurrentUserFailure = createAction('FETCH_CURRENT_USER_FAILURE');

export const addFavouriteQueryRequest = createAction('ADD_FAVOURITE_QUERY_REQUEST');
export const addFavouriteQuerySuccess = createAction('ADD_FAVOURITE_QUERY_SUCCESS');
export const addFavouriteQueryFailure = createAction('ADD_FAVOURITE_QUERY_FAILURE');

export const editFavouriteQueryRequest = createAction('EDIT_FAVOURITE_QUERY_REQUEST');
export const editFavouriteQuerySuccess = createAction('EDIT_FAVOURITE_QUERY_SUCCESS');
export const editFavouriteQueryFailure = createAction('EDIT_FAVOURITE_QUERY_FAILURE');

export const removeFavouriteQueryRequest = createAction('REMOVE_FAVOURITE_QUERY_REQUEST');
export const removeFavouriteQuerySuccess = createAction('REMOVE_FAVOURITE_QUERY_SUCCESS');
export const removeFavouriteQueryFailure = createAction('REMOVE_FAVOURITE_QUERY_FAILURE');

export const fetchCurrentUser = (history) => async (dispatch) => {
    try {
        dispatch(fetchCurrentUserRequest());
        if(localStorage.getItem('youtubeToken')) {
            const response = await userApi.getCurrentUser();
            const user = response.data;
            dispatch(fetchCurrentUserSuccess(user));
            history.push('/');
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

export const editFavouriteQuery = (favouriteQuery) => async (dispatch) => {
    try {
        dispatch(editFavouriteQueryRequest());
        const response = await userApi.editFavouriteQuery(favouriteQuery);
        const editedFavouriteQuery = response.data;
        dispatch(editFavouriteQuerySuccess(editedFavouriteQuery));
    }
    catch(err) {
        console.log(err);
        dispatch(editFavouriteQueryFailure(err));
    }
}

export const removeFavouriteQuery = (id) => async (dispatch) => {
    try {
        dispatch(removeFavouriteQueryRequest());
        const response = await userApi.removeFavouriteQuery(id);
        const removedId = response.data._id;
        dispatch(removeFavouriteQuerySuccess(removedId));
    }
    catch(err) {
        console.log(err);
        dispatch(removeFavouriteQueryFailure(err));
    }
}