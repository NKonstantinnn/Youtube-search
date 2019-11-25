import get from './base/get';
import keys from '../keys';

const youtubeApiURL = 'https://www.googleapis.com/youtube/v3';

export default {
    getVideos: (query, maxResults = 12, order = 'relevance') => get(`${youtubeApiURL}/search`, {
        params: {
            part: 'snippet',
            type: 'video',
            q: query,
            maxResults,
            order,
            key: keys.youtubeApiKey
        }
    }),
};