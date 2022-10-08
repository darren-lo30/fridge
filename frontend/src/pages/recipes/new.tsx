import { GetServerSideProps } from "next";
import RecipeAPI from "@src/apiLayer/RecipeAPI";


export const getServerSideProps : GetServerSideProps = async (context) => {
  try {

    const recipe = await RecipeAPI.createDraftRecipe({
      headers: {
        Cookie: `connect.sid=${context.req.cookies['connect.sid'] || '' }`
      }
    });
  } catch (e) {
    console.log('bad');
  }



  return {
    redirect: {
      permanent: false,
      destination: `/recipes/${123}/edit`
    }
  };
}
  
const CreateRecipe = () => {
  return null
}

export default CreateRecipe;