import {createAction} from 'redux-actions';

export const fetchVideosRequest = createAction('FETCH_VIDEO_REQUEST');
export const fetchVideosSuccess = createAction('FETCH_VIDEO_SUCCESS');
export const fetchVideosFailure = createAction('FETCH_VIDEO_FAILURE');

export const fetchVideos = (query) => async (dispatch) => {
    try {
        dispatch(fetchVideosRequest());
        // fetch video from youtube
        dispatch(fetchVideosSuccess());
    }
    catch(err) {
        console.log(err);
        dispatch(fetchVideosFailure(err));
    }
};