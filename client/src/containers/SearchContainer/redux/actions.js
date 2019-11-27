import {createAction} from 'redux-actions';

import youtubeApi from '../../../api/youtubeApi';

export const fetchVideosRequest = createAction('FETCH_VIDEO_REQUEST');
export const fetchVideosSuccess = createAction('FETCH_VIDEO_SUCCESS');
export const fetchVideosFailure = createAction('FETCH_VIDEO_FAILURE');

export const fetchVideos = (query, maxResults, order) => async (dispatch) => {
    try {
        dispatch(fetchVideosRequest());
        let response = await youtubeApi.searchVideos(query, maxResults, order);
        let ids = "";
        let videos = response.data.items.map(({id, snippet}) => {
            ids += id.videoId + ',';
            return {
                id: id.videoId,
                title: snippet.title,
                channelTitle: snippet.channelTitle,
            }
        });

        response = await youtubeApi.getStatistics(ids);
        response.data.items.forEach((item, idx) => {
            videos[idx].viewCount = item.statistics.viewCount;
        });

        dispatch(fetchVideosSuccess({ videos, query }));
    }
    catch(err) {
        console.log(err.response);
        dispatch(fetchVideosFailure(err));
    }
};