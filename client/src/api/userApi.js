import get from './base/get';
import post from './base/post';
import put from './base/put';
import {baseUrl} from './base/base';
import {getAuthParams} from './base/base';

export default {
    getCurrentUser: () => get(`${baseUrl}/user/current`, getAuthParams()),
    addFavouriteQuery: (favouriteQuery) => post(`${baseUrl}/user/favourite`, favouriteQuery,  getAuthParams()),
    editFavouriteQuery: (favouriteQuery) => put(`${baseUrl}/user/favourite`, favouriteQuery,  getAuthParams())
};