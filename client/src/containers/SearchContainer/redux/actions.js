import {createAction} from 'redux-actions';

import youtubeApi from '../../../api/youtubeApi';

export const fetchVideosRequest = createAction('FETCH_VIDEO_REQUEST');
export const fetchVideosSuccess = createAction('FETCH_VIDEO_SUCCESS');
export const fetchVideosFailure = createAction('FETCH_VIDEO_FAILURE');

export const fetchVideos = (query, maxResults, order) => async (dispatch) => {
    try {
        dispatch(fetchVideosRequest());
        const {data} = await youtubeApi.getVideos(query, maxResults, order);
        const videos = data.items.map(({id, snippet}) => ({
            id: id.videoId,
            title: snippet.title,
            description: snippet.description
        }));
        dispatch(fetchVideosSuccess(videos));
    }
    catch(err) {
        console.log(err);
        dispatch(fetchVideosFailure(err));
    }
};