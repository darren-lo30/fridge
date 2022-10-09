import { GetServerSideProps } from "next";
import RecipeAPI from "@src/apiLayer/RecipeAPI";


export const getServerSideProps : GetServerSideProps = async (context) => {
  const recipe = await RecipeAPI.createDraftRecipe({
    headers: {
      Cookie: `connect.sid=${context.req.cookies['connect.sid'] || '' }`
    }
  });
  
  return {
    redirect: {
      permanent: false,
      destination: `/recipes/${recipe.id}/edit`
    }
  };
}
  
const CreateRecipe = () => {
  return null
}

export default CreateRecipe;