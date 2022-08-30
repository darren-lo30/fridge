import { SimpleGrid, Flex, Heading,FormLabel, Box, Input, Textarea, FormControl, Switch, HStack, useToast, useDisclosure, Drawer, DrawerOverlay, DrawerContent } from "@chakra-ui/react"
import { FridgeButton } from "./FridgeButton"
import IngredientCreator from "./IngredientCreator"
import RecipeEditor from "@components/editor/RichTextEditor"
import { Recipe } from "@fridgeTypes/Recipe";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import RecipeAPI from "@src/apiLayer/RecipeAPI";
import { useEffect, useRef, useState } from "react";
import { Content } from "@tiptap/react";
import IngredientAPI, { IngredientCreationData } from "@src/apiLayer/IngredientAPI";
import { addIngredients, addIngredientStart, clearIngredients } from "@src/reducers/ingredientsReducer";
import { extendIngredientTypes, filterIngredientTypes, removeIngredientType } from "@src/reducers/ingredientTypesReducer";
import { useAppDispatch, useAppSelector } from "@src/utils/hooks";
import IngredientPreview from "../IngredientPreview";

interface RecipeEditFormProps {
  recipe: Recipe,
}

interface RecipeEditFormData {
  title: string,
  description: string,
  published: boolean,
}

const RecipeEditForm = ({ recipe } : RecipeEditFormProps) => {
  const {
    register,
    handleSubmit,
  } = useForm<RecipeEditFormData>({
    defaultValues: {
      title: recipe.title,
      description: recipe.description,
      published: recipe.published,
    }
  });

  const recipeIngredients = useAppSelector((state) => state.ingredientData.ingredients);

  const [instructions, setInstructions] = useState<Content>(recipe.instructions);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch(clearIngredients());
    dispatch(addIngredients({ ingredients: recipe.ingredients }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);



  const createRecipeIngredient = async (data: IngredientCreationData) => {
    const ingredient = await IngredientAPI.createRecipeIngredient(recipe.id, data);
    dispatch(removeIngredientType({ ingredientTypeId: ingredient.ingredientType.id }));
    dispatch(addIngredientStart({ ingredient }));
  }
  
  const getIngredientTypes = async (search?: string) => {
    await dispatch(extendIngredientTypes({ indexType: 'all', search }));
    dispatch(filterIngredientTypes({ removeIds: recipe.ingredients.map((ingredient) => ingredient.ingredientType.id) }));
  }
  
  
  const onSave = async (data: RecipeEditFormData) => {
    const updatedRecipe = await RecipeAPI.updateRecipe(recipe.id, {...data, instructions: JSON.stringify(instructions)});  
    
    if(updatedRecipe.published) {
      await router.push(`/recipes/${updatedRecipe.id}`);
      toast({
        title: 'Successfully Published',
        position: 'top',
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
    } else {
      if(data.published) {
        toast({
          title: 'Fill All Fields Before Pubishing',
          position: 'top',
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Draft saved',
          position: 'top',
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
      }
      recipe = updatedRecipe;
    } 
  }


  return (
    <>
        <SimpleGrid templateColumns={{base: '1fr', sm: '4fr 1fr' }} gap='5' height='100%' >
          <Flex as='form' flexDir='column' order={{base: 2, md: 1 }} onSubmit={handleSubmit(onSave)}>
            <FormControl>
              <Input 
                type='text' 
                fontSize={'4xl'}
                fontWeight='bold'
                mb='3'
                bg='white'
                py='2rem'
                isRequired
                {...register('title')}
              />
            </FormControl>
            <FormControl>
              <Textarea
                isRequired
                p='3' bg='white' rounded='5' my='2'
                noOfLines={3}
                resize='none'
                overflowY={'auto'}
                placeholder="A brief description of this recipe"
                {...register('description')}
              />
            </FormControl>

            <Box flex='1' flexBasis='0'>
              <RecipeEditor initialContent={recipe.instructions} setContent={(content) => {setInstructions(content)}}/>
            </Box>

            <HStack alignItems={'center'} mt='3' justifyContent={'space-between'}>
              <FormControl display='flex' width='min-content' alignItems='center'>
                <FormLabel htmlFor='publish' mb='0' fontWeight='bold'>
                  Publish
                </FormLabel>

                <Switch 
                  size='lg'
                  id='publish'
                  colorScheme='green'
                  {...register('published')}
                />
              </FormControl>
              <FridgeButton px='3rem' alignSelf='start' type='submit' slidedirection='right'>Save</FridgeButton>
            </HStack>
          </Flex>
          <Flex flexDir={'column'} order={{base: 1, md: 2 }} height='100%' alignItems='start'>
            <Heading size='lg' mb='3'>Ingredients</Heading>
            <FridgeButton size='sm' textAlign={'left'} ref={btnRef} onClick={onOpen}> Add Ingredient</FridgeButton>
            <Box py='3' width='100%'>
              {recipeIngredients.map((ingredient) => (
                <IngredientPreview key={ingredient.id} ingredient={ingredient} isEditable={true} />
              ))}
            </Box>
          </Flex>
        </SimpleGrid>
        
        
      {/* Side panel */}
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg='background' pl='3' pr='3' py='10'>
          <Heading mb='2' size='lg'>Add Ingredients</Heading>
          <IngredientCreator createIngredient={createRecipeIngredient} getIngredientTypes={getIngredientTypes} gridProps={{columns: {sm: 1, md: 1, lg: 1}}}/>
        </DrawerContent>
      </Drawer>
    </>
  )
};

export default RecipeEditForm;