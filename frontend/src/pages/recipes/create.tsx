import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { Box } from "@chakra-ui/react";
import RecipeEditForm from "@components/forms/RecipeEditForm";
import { useState } from "react";
import { Recipe } from "@fridgeTypes/Recipe";


export const getServerSideProps : GetServerSideProps<{ recipe: Recipe }> = async (context) => {
  const recipe = CreateRecipe
}
  
const CreateRecipe : NextPage = ({ recipe } : InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [recipe, setRecipe] = useState<Recipe>();
    return (
    <Box flex='1'>
      <RecipeEditForm />
    </Box>
  )
}

export default CreateRecipe;