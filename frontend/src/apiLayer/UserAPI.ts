import api from '@configs/axiosConfig';
import { ResponseWithUser } from '@fridgeTypes/User';


const UserAPI = {
  show: async function (id : string) {
    const response = await api.get<ResponseWithUser>(`/users/${id}`);
    return response.data.user;
  },

  signIn: async function (email: string, password: string) {      
    const response = await api.post<ResponseWithUser>('/sign-in', {
      email,
      password
    });
    return response.data.user;

  },

  signUp: async function (fullName: string, email: string, password: string) {
    const response = await api.post<ResponseWithUser>('/sign-up', {
      fullName,
      email,
      password,
    });

    return response.data.user;
  },

  signOut: async function () {
    await api.post('/sign-out');
  },

  auth: async function () {
    const response = await api.post<ResponseWithUser>('/auth');
    return response.data.user;
  }
};



export default UserAPI;
