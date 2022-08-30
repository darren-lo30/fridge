import {  FormControl, InputGroup, InputRightAddon, Select } from "@chakra-ui/react";
import { Ingredient } from "@fridgeTypes/Ingredient";
import { useMeasurementUnit } from "@src/contexts/MeasurementUnitProvider";
import { getDisplayUnitOptions } from "@src/utils/fridge";
import { useForm } from "react-hook-form";
import { FridgeButton } from "./FridgeButton";
import { InputWithError } from "./InputWithError";

interface UpdateIngredientFormProps {
  ingredient: Ingredient,
  onUpdate: (data: UpdateIngredientFormData) => void,
}

interface UpdateIngredientFormData {
  displayAmount: number,
  displayUnit: string,
}

const UpdateIngredientForm = ({ ingredient, onUpdate } : UpdateIngredientFormProps) => {
  const { 
    register,
    handleSubmit,
  } = useForm<UpdateIngredientFormData>({
    defaultValues: {
      displayAmount: Math.round(ingredient.displayAmount),
      displayUnit: ingredient.displayUnit,
    }
  });

  
  const { measurementUnitOptions } = useMeasurementUnit();
  const displayUnitOptions = getDisplayUnitOptions(measurementUnitOptions, ingredient.ingredientType);

  return (
    <form onSubmit={handleSubmit(onUpdate)} >
      <FormControl>
        <InputGroup>
          <InputWithError 
            type='number'
            placeholder='amount'
            {...register('displayAmount')}
          />
          <InputRightAddon p='0'>
            <Select 
             borderWidth='0'
              minWidth='max-content'
              isRequired={true}
              {...register('displayUnit')}
            >
              {
                displayUnitOptions.map((measurementUnit) => (
                  <option key={measurementUnit} value={measurementUnit}>{ measurementUnit }</option>
                ))
              }
            </Select>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <FridgeButton mt='3' type='submit'>Update</FridgeButton>
    </form>
  )
}

export default UpdateIngredientForm;