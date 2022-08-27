import { Box, BoxProps, FormControl, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { Ingredient } from "@fridgeTypes/Ingredient";
import { MeasurementUnitOptions } from "@fridgeTypes/MeasurementUnit";
import { useForm } from "react-hook-form";
import { InputWithError } from "./InputWithError";

interface UpdateIngredientFormProps {
  ingredient: Ingredient,
  // allDisplayUnitOptions: MeasurementUnitOptions,
}

interface UpdateIngredientFormData {
  displayAmount: number,
  displayUnit: string,
}

const UpdateIngredientForm = ({ ingredient } : UpdateIngredientFormProps) => {
  const { 
    register,
    handleSubmit,
  } = useForm<UpdateIngredientFormData>({
    defaultValues: {
      displayAmount: ingredient.displayAmount,
      displayUnit: ingredient.displayUnit,
    }
  });

  const onSubmit = (data: UpdateIngredientFormData) => {
    const { displayAmount, displayUnit } = data;
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
          <InputRightAddon>
            { ingredient.displayUnit }
          </InputRightAddon>
        </InputGroup>
      </FormControl>
    </form>
  )
}

export default UpdateIngredientForm;