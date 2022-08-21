import { Box } from "@chakra-ui/react";
import React from "react";

const CenteredForm = ({ children } : React.PropsWithChildren) => (
  <Box 
    mx={'auto'} 
    my={'20vh'} 
    p={'5'} 
    width={'600px'}
    maxWidth={'90%'}
  >
    { children }
  </Box>
)

export default CenteredForm;