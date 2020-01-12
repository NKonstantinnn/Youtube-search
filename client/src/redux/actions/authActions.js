import {createAction} from 'redux-actions';

import authApi from '../../api/authApi';
import {fetchCurrentUser} from './currentUserActions';

export const fetchAuthRequest = createAction('FETCH_AUTH_REQUEST');
export const fetchAuthSuccess = createAction('FETCH_AUTH_SUCCESS');
export const fetchAuthFailure = createAction('FETCH_AUTH_FAILURE');

export const fetchAuth = (user, isSignUp, history) => async (dispatch) => {
    try {
        dispatch(fetchAuthRequest());
        const authFunc = isSignUp ? authApi.signUp : authApi.signIn;
        const response = await authFunc(user);
        const { token } = response.data;
        localStorage.setItem('youtubeToken', token);
        dispatch(fetchAuthSuccess());
        dispatch(fetchCurrentUser(history));
    }
    catch(err) {
        console.log(err);
        dispatch(fetchAuthFailure(err));
    }
};
