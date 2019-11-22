export const baseUrl = '/api';

export const getDefaultParams = () =>  ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('youtubeToken')}`
    }
});