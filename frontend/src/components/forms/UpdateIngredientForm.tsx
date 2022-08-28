import {  FormControl, InputGroup, InputRightAddon, Select } from "@chakra-ui/react";
import { Ingredient } from "@fridgeTypes/Ingredient";
import IngredientAPI from "@src/apiLayer/IngredientAPI";
import { useMeasurementUnit } from "@src/contexts/MeasurementUnitProvider";
import { addOrReplaceIngredient } from "@src/reducers/ingredientsReducer";
import { getDisplayUnitOptions } from "@src/utils/fridge";
import { useAppDispatch } from "@src/utils/hooks";
import { useForm } from "react-hook-form";
import { FridgeButton } from "./FridgeButton";
import { InputWithError } from "./InputWithError";

interface UpdateIngredientFormProps {
  ingredient: Ingredient,
  onUpdate: () => void,
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
      displayAmount: ingredient.displayAmount,
      displayUnit: ingredient.displayUnit,
    }
  });

  
  const { measurementUnitOptions } = useMeasurementUnit();
  const displayUnitOptions = getDisplayUnitOptions(measurementUnitOptions, ingredient.ingredientType);

  const dispatch = useAppDispatch();

  const onSubmit = async (data: UpdateIngredientFormData) => {
    const { displayAmount, displayUnit } = data;

    const updatedIngredient = await IngredientAPI.updateIngredient(ingredient.id, {
      displayAmount,
      displayUnit,
    })

    dispatch(addOrReplaceIngredient({ ingredient: updatedIngredient }));    

    onUpdate();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
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