import axios from 'axios';
import { BASE_PATH } from '@/api/config';
import LocalStorageService from '@/api/LocalStorageService';
import { Repository } from '@/api/repository';

const localStorageService = LocalStorageService.getService();
let apiRepository: Repository;

export function useApi(): { api: Repository } {
  function getApi() {
    if (!apiRepository) {
      const instance = axios.create({
        baseURL: BASE_PATH,
        timeout: 10000,
      });

      instance.interceptors.request.use(
        (config) => {
          const token = localStorageService.getAccessToken();
          if (token && config.headers) {
            config.headers['Authorization'] = 'Bearer ' + token;
          }

          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
      );

      instance.interceptors.response.use(
        (response) => {
          return response;
        },
        // eslint-disable-next-line consistent-return
        (error) => {
          const originalRequest = error.config;
          // response can be undefined in case of timeout
          // eslint-disable-next-line no-underscore-dangle
          if (error.response?.status === 401 && !originalRequest._retry) {
            // eslint-disable-next-line no-underscore-dangle
            originalRequest._retry = true;
            return axios(originalRequest);
          }
          throw error;
        },
      );

      apiRepository = new Repository(instance);
    }
    return apiRepository;
  }

  return { api: getApi() };
}
