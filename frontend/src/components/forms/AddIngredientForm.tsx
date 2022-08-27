import IngredientAPI from "src/apiLayer/IngredientAPI";
import { FormControl, Heading,  InputGroup, InputRightAddon, Select } from "@chakra-ui/react";
import { FridgeButton } from "@components/forms/FridgeButton";
import { InputWithError } from "@src/components/forms/InputWithError";
import { useUser } from "@contexts/UserProvider";
import { Ingredient } from "@fridgeTypes/Ingredient";
import { IngredientType } from "@fridgeTypes/IngredientType";
import { useForm } from "src/utils/forms";
import { useMeasurementUnit } from "@src/contexts/MeasurementUnitProvider";
import { getDisplayUnitOptions } from "@src/utils/fridge";


interface AddIngredientFormProps {
  ingredientType: IngredientType,
  addIngredient: (ingredient: Ingredient) => void,
}

interface AddIngredientFormData {
  displayAmount: number,
  displayUnit: string,
}

const AddIngredientForm = ({ ingredientType, addIngredient }: AddIngredientFormProps) => {
  const {
    handleSubmit,
    register,
    setError,
    reset,
  } = useForm<AddIngredientFormData>();
  
  const {user} = useUser();
  if(!user) throw new Error('Must log in');

  // Get display unit options when creating the ingredient
  const { measurementUnitOptions } = useMeasurementUnit();
  const displayUnitOptions = getDisplayUnitOptions(measurementUnitOptions, ingredientType);

  const onSubmit = async (data: AddIngredientFormData) => {
    const { displayAmount, displayUnit } = data; 
    try {
      const ingredient = await IngredientAPI.createIngredient(user.fridgeId, { ingredientTypeId: ingredientType.id, displayAmount, displayUnit });
      addIngredient(ingredient);
      reset();
    } catch (e) {
      setError('formError', { message: 'Something went wrong' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

export default AddIngredientForm;