import { Box, Text, Heading } from "@chakra-ui/react";
import { useUser } from "@contexts/UserProvider";
import { NextPage } from "next";

const Account : NextPage = () => {
  const { user } = useUser();

  if(!user) {
    return <Text>Something went wrong</Text>
  }
  return (
    <Box>
      <Heading>
        Hello, { user.fullName }
      </Heading>
      <Text color='gray.600'>
        {user.email}
      </Text>
    </Box>
  )
}

export default Account;