import { Ingredient, IngredientType, MeasurementType } from '@prisma/client';
import configureMeasurements, { allMeasures, AllMeasuresUnits } from 'convert-units';

export const convert = configureMeasurements(allMeasures);

const baseUnits = ['ml', 'g', 'no'] as const;
type BaseUnit = typeof baseUnits[number];

function assertValidBaseUnit(baseUnit: string) : asserts baseUnit is BaseUnit {
  if ((baseUnits as readonly string[]).indexOf(baseUnit) === -1) throw Error('Base units mismatch in measurement types');
}

function getBaseUnit(measurementType: MeasurementType) : BaseUnit {
  const baseUnit = measurementType.split('_')[1].toLowerCase();
  assertValidBaseUnit(baseUnit);

  return baseUnit;
}

function assertValidDisplayUnit(baseUnit: 'ml' | 'g', displayUnit: string) : asserts displayUnit is AllMeasuresUnits {
  const possibleReturnUnits = convert().from(baseUnit).possibilities();

  if (!possibleReturnUnits.includes(baseUnit)) {
    throw Error('Display unit is invalid.');
  }
}

export const convertToBaseAmount = (
  displayAmount: number,
  measurementType: MeasurementType,
  displayUnit: string,
) => {
  const baseUnit = getBaseUnit(measurementType);

  if (baseUnit !== 'no') {
    assertValidDisplayUnit(baseUnit, displayUnit);
    return convert(displayAmount).from(displayUnit).to(baseUnit);
  }

  return displayAmount;
};

export const convertToDisplayAmount = (
  baseAmount: number,
  measurementType: MeasurementType,
  displayUnit: string,
) => {
  const baseUnit = getBaseUnit(measurementType);

  if (baseUnit !== 'no') {
    assertValidDisplayUnit(baseUnit, displayUnit);
    return convert(baseAmount).from(baseUnit).to(displayUnit);
  }

  return baseAmount;
};

export const convertToReturnIngredient = (
  ingredient: Ingredient & { ingredientType: IngredientType },
) => {
  const baseUnit = getBaseUnit(ingredient.ingredientType.measurementType);
  assertValidBaseUnit(baseUnit);

  const displayAmount = convertToDisplayAmount(
    parseFloat(String(ingredient.amount)),
    ingredient.ingredientType.measurementType,
    ingredient.displayUnit,
  );

  return {
    ...ingredient,
    displayAmount,
  };
};
