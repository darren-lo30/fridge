import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import RecipeAPI from "src/apiLayer/RecipeAPI";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Recipe } from "@fridgeTypes/Recipe";

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

const RecipePage = ({ recipe }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Box>
    <Heading>
      { recipe.title }
    </Heading>
    <Box>
      <Text>
        { recipe.instructions }
      </Text>
    </Box>
  </Box>
)

export default RecipePage;