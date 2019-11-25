export const baseUrl = '/api';

export const getAuthParams = () =>  ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('youtubeToken')}`
    }
});