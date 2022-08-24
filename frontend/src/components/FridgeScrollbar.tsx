import { Box, BoxProps } from "@chakra-ui/react"

const FridgeScrollbar = (props: BoxProps) => {
  return (
    <Box 
      __css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'secondary.main',
          borderRadius: '24px',
        },
      }}
      {...props}
    >
      { props.children }
      
    </Box>
  );
}

export default FridgeScrollbar;
