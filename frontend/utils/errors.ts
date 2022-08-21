import api from "@configs/axiosConfig";
import axios, { AxiosError } from "axios";

export const isAPIError = (error: unknown) : error is AxiosError<APIError> => {
  return axios.isAxiosError(error) && error.response !== undefined && error.response !== null;
}

export const getAPIError = (error: AxiosError<APIError>) : APIError => {
  if(!error.response) {
    throw new Error(`Not an API Error`);
  }

  const apiError = error.response.data;
  if(!apiError.statusCode) apiError.statusCode = error.response.status;

  return apiError;
}

export interface APIError {
  statusCode: number;
  message: string;
  data: object;
}
