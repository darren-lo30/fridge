import { Flex, FlexProps, Spinner, SpinnerProps } from "@chakra-ui/react";
interface FridgeSpinnerProps {
  containerProps?: FlexProps, 
  spinnerProps?: SpinnerProps
}

const FridgeSpinner = ({ containerProps, spinnerProps } : FridgeSpinnerProps ) => (
  <Flex justifyContent={'center'} { ...containerProps }>
    <Spinner size='xl' thickness="5px" color="primary.700" {...spinnerProps }/>
  </Flex>
);

export default FridgeSpinner