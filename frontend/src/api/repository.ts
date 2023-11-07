import { AxiosInstance } from 'axios';
import { IGetWordlistPayload } from './request.types';
import { IGetWordlistResponse } from './response.types';

export class Repository {
  private $axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.$axios = axiosInstance;
  }

  public GET_WORDLIST = (data: IGetWordlistPayload): Promise<IGetWordlistResponse> => {
    return this.$axios({
      method: 'post',
      url: '/api/v1/wordlists',
      data,
    });
  };
}
