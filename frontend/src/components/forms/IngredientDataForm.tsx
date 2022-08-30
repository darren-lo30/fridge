import { Box, FormControl, Heading,  InputGroup, InputRightAddon, Select } from "@chakra-ui/react";
import { FridgeButton } from "@components/forms/FridgeButton";
import { InputWithError } from "@src/components/forms/InputWithError";
import { IngredientType } from "@fridgeTypes/IngredientType";
import { useForm } from "src/utils/forms";
import { useMeasurementUnit } from "@src/contexts/MeasurementUnitProvider";
import { getDisplayUnitOptions } from "@src/utils/fridge";
import { useEffect } from "react";


interface IngredientDataFormProps {
  ingredientType: IngredientType | undefined,
  onSubmit: (data: IngredientDataFormData) => void,
}


export interface IngredientDataFormData {
  displayAmount: number,
  displayUnit: string,
  ingredientTypeId: string,
}

const IngredientDataForm = ({ ingredientType, onSubmit }: IngredientDataFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<IngredientDataFormData>();

  useEffect(() => {
    reset();
    setValue('ingredientTypeId', ingredientType?.id || '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientType]);

  const onFormSubmit = (data: IngredientDataFormData) => {
    onSubmit(data);
  }
  
  const { measurementUnitOptions } = useMeasurementUnit();
  if(ingredientType === undefined) {
    return (
      <Box>
        <Heading size='md'>No ingredient is currently selected...</Heading>
      </Box>
    )
  }

  // Get display unit options when creating the ingredient
  const displayUnitOptions = getDisplayUnitOptions(measurementUnitOptions, ingredientType);
  
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Heading size='md' mb='5'>
        Adding {ingredientType.name}
      </Heading>
      <FormControl mb='3'>
        <InputGroup maxWidth='300px'>
          <InputWithError 
            type='number' 
            placeholder={'Amount'}
            isRequired={true}
            {...register('displayAmount') }
          />
          <InputRightAddon p='0'>
            <Select 
              minWidth='max-content'
              isRequired={true}
              {...register('displayUnit') }
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
      <FridgeButton slidedirection="bottom" type='submit'>
        Add Ingredient
      </FridgeButton>
    </form>
  );
}

export default IngredientDataForm;