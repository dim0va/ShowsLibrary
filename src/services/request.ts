import Axios from 'axios';

const request = Axios.create({
  baseURL: 'https://api.tvmaze.com',
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'en',
    'Accept-Charset': 'UTF-8',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export default request;
