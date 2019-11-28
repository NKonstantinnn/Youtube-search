import {createAction} from 'redux-actions';

import authApi from '../../api/authApi';
import {fetchCurrentUser} from './currentUserActions';

export const fetchSignInRequest = createAction('FETCH_SIGN_IN_REQUEST');
export const fetchSignInSuccess = createAction('FETCH_SIGN_IN_SUCCESS');
export const fetchSignInFailure = createAction('FETCH_SIGN_IN_FAILURE');

export const fetchSignIn = (user, history) => async (dispatch) => {
    try {
        dispatch(fetchSignInRequest());
        const {data} = await authApi.signIn(user);
        localStorage.setItem('youtubeToken', data.token);
        dispatch(fetchSignInSuccess(history));
        dispatch(fetchCurrentUser(history));
        history.push('/search');
    }
    catch(err) {
        console.log(err);
        dispatch(fetchSignInFailure(err));
    }
};