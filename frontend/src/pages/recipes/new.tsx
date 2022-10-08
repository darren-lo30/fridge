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
    return {
      redirect: {
        permanent: false,
        destination: `/recipes/${context.req.cookies['connect.sid'] || ''}/edit`
      }
    };
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