import axios, { AxiosError } from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const handleError = (error: AxiosError) => {
  console.error(error.response?.data);

  return Promise.reject(error);
}

api.interceptors.response.use(undefined, (error: AxiosError) => handleError(error));

export default api;
