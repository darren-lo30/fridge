import { ResponseWithMeasurementUnits } from "@fridgeTypes/MeasurementUnit"
import api from "@src/configs/axiosConfig"

const MeasurementUnitAPI = {
  indexMeasurementUnits: async function () {
    const response = await api.get<ResponseWithMeasurementUnits>('/measurementUnits');
    
    return response.data.measurementUnits;
  }
}

export default MeasurementUnitAPI;