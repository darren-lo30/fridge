import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import RecipeAPI from "src/apiLayer/RecipeAPI";
import { Box, Image, Flex, Heading, IconButton, Link, Text, Stack } from "@chakra-ui/react";
import { Recipe } from "@fridgeTypes/Recipe";
import { useUser } from "@src/contexts/UserProvider";
import { RiDeleteBin2Line, RiPencilLine } from "react-icons/ri";
import IngredientPreview from "@src/components/IngredientPreview";
import { useRouter } from "next/router";
import RichTextRenderer from "@components/editor/RichTextRenderer";

export const getServerSideProps : GetServerSideProps<{ recipe: Recipe }> = async (context) => {
  const { id } = context.query;

  if(typeof id !== 'string') {
    return { 
      notFound: true,
    }
  }

  try {
    const recipe = await RecipeAPI.showRecipe(id, {
      headers: {
        Cookie: `connect.sid=${context.req.cookies['connect.sid'] || '' }`
      }
    });
    return {
      props: {
        recipe
      }
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}

const RecipePage = ({ recipe }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser();

  const router = useRouter();
  const deleteRecipe = async () => {
    await RecipeAPI.deleteRecipe(recipe.id);
    await router.push('/recipes')
  }
  
  return (
  <Flex flex='1' gap='3rem'>
    <Box flex='1'>  
      <Image src={recipe.thumbnail || '/placeholder.svg'} alt='Recipe thumbnail' />
      <Box pt='5' mt='5'>
        <Heading size='lg'>
          Ingredients
        </Heading>
        <Stack my='5'>
          {recipe.ingredients.map((ingredient) => (
            <IngredientPreview key={ingredient.id} ingredient={ingredient} isEditable={false} />
          ))}
        </Stack>
      </Box>
      
    </Box>
    <Box flex='2'>
      <Flex alignItems={'center'} justifyContent='space-between' width='100%'>
        <Heading>
          { recipe.title } { !recipe.published && (<i>(Draft)</i>)}
        </Heading>
        { user && user.id === recipe.author.id && (
          <Box ml='auto'>
            <Link href={`/recipes/${recipe.id}/edit`} p='2'>
              <IconButton 
                icon={<RiPencilLine />} 
                aria-label={"Edit Recipe"} 
                bg='transparent'
                _hover={{
                  background: 'primary.main'
                }}
              />
            </Link>
            <IconButton 
              icon={<RiDeleteBin2Line />} 
              aria-label={"Delete recipe"} 
              bg='transparent'
              _hover={{
                background: 'red.300'
              }}
              onClick={deleteRecipe}
            />
          </Box>
        )}
      </Flex>
      <Text color='gray.500'>
        { `By: ${recipe.author.fullName}`}
      </Text>
      <Text fontSize='lg' mt='2'>
        { recipe.description || 'No description' }
      </Text>
      <Box>
        <Heading size='lg' mt='3rem'>
          Instructions
        </Heading>
        <RichTextRenderer content={recipe.instructions} />
      </Box>
    </Box>
  </Flex>
);
}

export default RecipePage;