import { Box } from "@chakra-ui/react";
import IngredientList from "@components/IngredientList";
import { useUser } from "@contexts/UserProvider";
import { NextPage } from "next";

const Fridge: NextPage = () => {
  const { user } = useUser();

  if(!user) {
    throw new Error("Please sign out and sign in again.");
  }

  return (
    <Box width='300px'>
      <IngredientList fridgeId={user.fridgeId} />
    </Box>
  )

}

export default Fridge;
