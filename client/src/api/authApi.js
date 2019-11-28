import post from './base/post';
import {baseUrl} from './base/base';

export default {
    signIn: (user) => post(`${baseUrl}/auth/signin`, user),
};