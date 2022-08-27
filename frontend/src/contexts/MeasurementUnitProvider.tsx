import { MeasurementUnitOptions } from "@fridgeTypes/MeasurementUnit";
import MeasurementUnitAPI from "@src/apiLayer/MeasurementUnitAPI";
import React, { useEffect, useState } from "react";
import { createCtx } from "./contextUtils";

interface MeasurementUnitContextState {
  measurementUnitOptions: MeasurementUnitOptions,
}

const [useMeasurementUnit, MeasurementUnitProviderCtx] = createCtx<MeasurementUnitContextState>();
export { useMeasurementUnit };

export const MeasurementUnitProvider = ({ children } : React.PropsWithChildren) => {
  const [measurementUnitOptions, setMeasurementUnitOptions] = useState<MeasurementUnitOptions>({
    discrete_no: ['no'],
    volume_mL: [],
    weight_g: [],
  });
  
  useEffect(() => {
    void(async () => {
      const fetchedMeasurementUnitOptions = await MeasurementUnitAPI.indexMeasurementUnits();
      setMeasurementUnitOptions(fetchedMeasurementUnitOptions);
    })();
  }, []);

  return (
    <MeasurementUnitProviderCtx value={{ measurementUnitOptions }}>
      { children }
    </MeasurementUnitProviderCtx>
  )
}
