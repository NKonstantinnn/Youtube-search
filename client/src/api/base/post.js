import axios from 'axios';

import {getDefaultParams} from './base';

export default (url, body, params = {...getDefaultParams()}) => axios.post(url, body, params);