import axios from 'axios';

export default (url, params) => axios.get(url, params);