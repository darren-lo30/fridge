import { Button, ButtonProps } from "@chakra-ui/react";

const FridgeButton = (props: ButtonProps) => (
  <Button
    bg={'primary.main'}
    _hover={{
      bg: 'secondary.main'
    }}  
    _active={{
      bg: 'secondary.light'
    }}
    { ...props }
  >
  {props.children}
  </Button>
);

export default FridgeButton;