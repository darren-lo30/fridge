import { Flex, Box, Text, Image, IconButton, HStack } from "@chakra-ui/react";
import {Ingredient} from "@fridgeTypes/Ingredient";
import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import UpdateIngredientForm from "./forms/UpdateIngredientForm";
import { AnimatePresence, motion } from "framer-motion";
import IngredientAPI, { IngredientUpdateData } from "@src/apiLayer/IngredientAPI";
import { addOrReplaceIngredient, removeIngredient } from "@src/reducers/ingredientsReducer";
import { useAppDispatch } from "@src/utils/hooks";

interface IngredientPreviewProps {
  ingredient: Ingredient,
  isEditable: boolean,
  onDeleteCb?: (deletedIngredient: Ingredient) => void,
  onUpdateCb?: (updatedIngredient: Ingredient) => void,
}

const IngredientPreview = ({ ingredient, isEditable, onDeleteCb, onUpdateCb } : IngredientPreviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useAppDispatch();
  

  const updateIngredient = async (data: IngredientUpdateData) => {
    const updatedIngredient = await IngredientAPI.updateIngredient(ingredient.id, data);
    dispatch(addOrReplaceIngredient({ingredient: updatedIngredient}));
    setIsEditing(false);
    onUpdateCb && onUpdateCb(updatedIngredient);
  }

  const deleteIngredient = async () => {
    await IngredientAPI.deleteIngredient(ingredient.id);
    dispatch(removeIngredient({ ingredientId: ingredient.id }));
    onDeleteCb && onDeleteCb(ingredient);
  }
  
  return (
    <Box 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bg={isHovered ? 'gray.100' : 'inherit'}
    >
      <Flex width='100%' flexDirection='row' py='3' px='2' alignItems={'center'} borderTopWidth='2px' borderColor={'primary.main'} >
        <Image
          boxSize='50px'
          objectFit='cover'
          borderRadius='full'
          src='https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='
          alt={`Image of ${ingredient.ingredientType.name}`}
        />
        <Box ml='5'>  
          <Text fontSize={'sm'} fontWeight='bold'>
            { ingredient.ingredientType.name }
          </Text>
          <Text fontSize={'xs'} textAlign='left'>
            { `${Math.round(ingredient.displayAmount)} ${ingredient.displayUnit}` }
          </Text>
        </Box>


        { (isEditable && isHovered || isEditing) && (
          <Box ml='auto'>
            <HStack>
              <IconButton 
                size='sm' 
                icon={<EditIcon />} 
                aria-label={"Edit ingredient"} 
                borderRadius='full' 
                {...(isEditing ? {
                  bg: 'primary.200', 
                  _hover: {bg: 'primary.300'},
                  _active: {bg: 'primary.400'}
                } : null)} 
                onClick={() => {setIsEditing(!isEditing)}} 
              />
              <IconButton 
                size='sm' 
                bg='red.200' 
                _hover={{bg: 'red.300'}} 
                _active={{bg: 'red.400'}} 
                icon={<SmallCloseIcon />} 
                aria-label={"Edit ingredient"} 
                borderRadius='full' 
                onClick={() => deleteIngredient()}
              />
            </HStack>
          </Box>
        )}
      </Flex>
      <AnimatePresence>
        { isEditing && (
            <Box 
              as={motion.div} 
              key={ingredient.id}
              overflow='hidden'
              initial={{ maxHeight: '0px', y: '-50%', opacity: 0 }}
              animate={{ maxHeight: '200px', y: '0', opacity: 1 }}
              transition='0.3s ease-out'  
              exit={{ maxHeight: '-10px', opacity: 0 }}
            >
              <Box p='3'>
                <UpdateIngredientForm ingredient={ingredient} onUpdate={updateIngredient} />
              </Box>
            </Box> 
        )}
      </AnimatePresence>
    </Box>
  );
}

export default IngredientPreview;
