import axios from 'axios';

export default (url, body, params) => axios.put(url, body, params);