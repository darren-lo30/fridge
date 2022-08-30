import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Box } from "@chakra-ui/react";
import RecipeEditForm from "@components/forms/RecipeEditForm";
import { Recipe } from "@fridgeTypes/Recipe";
import RecipeAPI from "@src/apiLayer/RecipeAPI";


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
  
const CreateRecipe = ({ recipe } : InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
    <Box flex='1'>
      <RecipeEditForm recipe={recipe}/>
    </Box>
  )
}

export default CreateRecipe;