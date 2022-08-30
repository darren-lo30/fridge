import {  Box, Input, InputGroup, InputRightAddon, Select } from "@chakra-ui/react";
import { Ingredient } from "@fridgeTypes/Ingredient";
import { useMeasurementUnit } from "@src/contexts/MeasurementUnitProvider";
import { getDisplayUnitOptions } from "@src/utils/fridge";
import { useForm } from "react-hook-form";
import { FridgeButton } from "./FridgeButton";
import { InputErrorWrapper } from "./InputWithError";

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
    formState: { errors },
  } = useForm<UpdateIngredientFormData>({
    defaultValues: {
      displayAmount: Math.round(ingredient.displayAmount),
      displayUnit: ingredient.displayUnit,
    }
  });

  
  const { measurementUnitOptions } = useMeasurementUnit();
  const displayUnitOptions = getDisplayUnitOptions(measurementUnitOptions, ingredient.ingredientType);

  return (
    <Box>
      <form onSubmit={handleSubmit(onUpdate)} >
        <InputErrorWrapper errorMessage={errors.displayAmount && errors.displayAmount.message}>
          <InputGroup>
            <Input 
              type='number'
              placeholder='amount'
              {...register('displayAmount', {
                max: { 
                  value: 9999,
                  message: 'Maximum amount of ingredient is 9999',
                }
              })}
              width='0px'
              flex='1'
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
        </InputErrorWrapper>
        <FridgeButton mt='3' type='submit'>Update</FridgeButton>
      </form>
    </Box>
  )
}

export default UpdateIngredientForm;