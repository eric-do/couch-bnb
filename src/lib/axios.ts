import Axios, { AxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: AxiosRequestConfig) {
  return config;
}

export const axios = Axios.create({});

axios.interceptors.response.use(
  (response) => response.data
)