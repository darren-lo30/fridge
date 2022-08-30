import { IngredientType } from "@fridgeTypes/IngredientType";
import { MeasurementUnitOptions } from "@fridgeTypes/MeasurementUnit";

export const makeCancelable = (promise: Promise<unknown>) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export const getDisplayUnitOptions = (measurementUnitOptions: MeasurementUnitOptions, ingredientType: IngredientType) => {
  return measurementUnitOptions[ingredientType.measurementType];
}

interface HasId {
  id: string,
}
export const filterUnique = <T extends HasId>(array : T[]) => {
  return Array.from(new Map(array.map(item => [item.id, item])).values());
}