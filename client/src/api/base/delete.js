import axios from 'axios';

export default (url, params) => axios.delete(url, params);