import api from '@configs/axiosConfig';
import { ResponseWithUser } from '@fridgeTypes/User';


const UserAPI = {
  get: async function (id : string) {
    const response = await api.get<ResponseWithUser>(`/users/${id}`);
    return response.data;
  },

  signIn: async function (email: string, password: string) {      
    const response = await api.post<ResponseWithUser>('/sign-in', {
      email,
      password
    });
    return response.data;

  },

  signUp: async function (fullName: string, email: string, password: string) {
    const response = await api.post<ResponseWithUser>('/sign-up', {
      fullName,
      email,
      password,
    });

    return response.data;
  },

  auth: async function () {
    const response = await api.post<ResponseWithUser>('/auth');
    return response.data;
  }
};



export default UserAPI;
