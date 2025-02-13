import axios, { AxiosError, AxiosInstance } from 'axios';
import HttpStatusCode from '../constants/httpStatusEnum';
import { toast } from 'react-toastify';
import { getAccessTokenFromLS, setAccessTokenToLS } from './auth';
class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.instance.interceptors.request.use((config) => {
      if (this.accessToken && config.headers) {
        config.headers.Authorization = this.accessToken;
        return config;
      }
      return config;
    });
    this.instance.interceptors.response.use(
      (response) => {
        console.log(response);
        const { url } = response.config;
        if (url === 'login' || url === 'register') {
          this.accessToken = response.data.data.access_token;
          console.log(this.accessToken);
          setAccessTokenToLS(this.accessToken);
        }
        return response;
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errorHandle: any | undefined = error.response?.data;
          const message = errorHandle?.message || error.message;
          toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
