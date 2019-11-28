import get from './base/get';
import {baseUrl} from './base/base';
import {getAuthParams} from './base/base';

export default {
    getCurrentUser: () => get(`${baseUrl}/user/current`, getAuthParams()),
};