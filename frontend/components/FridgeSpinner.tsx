import { Flex, FlexProps, Spinner, SpinnerProps } from "@chakra-ui/react";

const FridgeSpinner = ({ containerProps, spinnerProps } : { containerProps?: FlexProps, spinnerProps?: SpinnerProps}) => (
  <Flex justifyContent={'center'} { ...containerProps }>
    <Spinner size='xl' thickness="5px" color="primary.700" {...spinnerProps }/>
  </Flex>
);

export default FridgeSpinner