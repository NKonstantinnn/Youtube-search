import post from './base/post';
import get from './base/get';
import {baseUrl} from './base/base';

export default {
    signIn: (user) => post(`${baseUrl}/auth/signin`, user),
    getCurrentUser: () => get(`${baseUrl}/auth/current`),
};