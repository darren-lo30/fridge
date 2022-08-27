import { Box, Fade } from "@chakra-ui/react";
import React from "react";

const CenteredForm = ({ children } : React.PropsWithChildren) => (
  <Box 
      mx={'auto'} 
      my={'20vh'} 
      p={'5'} 
      width={'600px'}
      maxWidth={'90%'}
    >
    <Fade in={true} transition={{ enter: {ease: 'easeIn', duration: 0.2 } }}>
        { children }
    </Fade>
  </Box>
)

export default CenteredForm;