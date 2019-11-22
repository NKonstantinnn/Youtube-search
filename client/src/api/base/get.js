import axios from 'axios';

import {getDefaultParams} from './base';

export default (url, params = {...getDefaultParams()}) => axios.get(url, params);