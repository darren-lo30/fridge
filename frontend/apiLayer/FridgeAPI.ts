import api from '@configs/axiosConfig';
import { ResponseWithFridge } from '@fridgeTypes/Fridge';

const FridgeAPI = {
  showFridge: async (userId: string) => {
    const response = await api.get<ResponseWithFridge>(`/users/${userId}/fridges`)
    return response.data.fridge;
  }
}

export default FridgeAPI;