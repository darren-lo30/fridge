import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export const Bounds = ( props: BoxProps) => (
  <Box {...props} px={'7'} width={'100%'} maxWidth={1280} marginLeft={'auto'} marginRight={'auto'}>
    {props.children}
  </Box>
)