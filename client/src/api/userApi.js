import get from './base/get';
import post from './base/post';
import {baseUrl} from './base/base';
import {getAuthParams} from './base/base';

export default {
    getCurrentUser: () => get(`${baseUrl}/user/current`, getAuthParams()),
    addFavouriteQuery: (favouriteQuery) => post(`${baseUrl}/user/favourite`, favouriteQuery,  getAuthParams())
};