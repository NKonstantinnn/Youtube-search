import axios from 'axios';

export default (url, body, params) => axios.post(url, body, params);