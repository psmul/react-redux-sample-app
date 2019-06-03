import axios from 'axios';
import config from '../config/config.dev';

const baseService = axios.create();

baseService.interceptors.request.use((axiosConfig) => {
  if(config.AUTH_REQUIRED) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('authToken')}`;
  }
  return axiosConfig;
});

baseService.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response.status > 400) {
      console.warn(error.message);
    }
  }
);

export default baseService;
