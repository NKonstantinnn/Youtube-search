import get from './base/get';
import post from './base/post';
import put from './base/put';
import del from './base/delete';
import {baseUrl} from './base/base';
import {getAuthParams} from './base/base';

export default {
    getCurrentUser: () => get(`${baseUrl}/user/current`, getAuthParams()),
    addFavouriteQuery: (favouriteQuery) => post(`${baseUrl}/user/favourite`, favouriteQuery, getAuthParams()),
    editFavouriteQuery: (favouriteQuery) => put(`${baseUrl}/user/favourite`, favouriteQuery, getAuthParams()),
    removeFavouriteQuery: (queryId) => del(`${baseUrl}/user/favourite/${queryId}`, getAuthParams()),
    signOutCurrentUser: () => get(`${baseUrl}/auth/signout`, getAuthParams())
};