import {createAction} from 'redux-actions';

import authApi from '../../../api/authApi';

export const fetchCurrentUserRequest = createAction('FETCH_CURRENT_USER_REQUEST');
export const fetchCurrentUserSuccess = createAction('FETCH_CURRENT_USER_SUCCESS');
export const fetchCurrentUserFailure = createAction('FETCH_CURRENT_USER_FAILURE');

export const fetchCurrentUser = (history) => async (dispatch) => {
    try {
        dispatch(fetchCurrentUserRequest());
        if(localStorage.getItem('youtubeToken')) {
            const response = await authApi.getCurrentUser();
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