import { forwardRef, Input, InputProps, FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React from "react";

export const InputErrorWrapper = ({errorMessage, children } : { errorMessage? : string} & React.PropsWithChildren) => (
    <FormControl
      width={'100%'}
      isInvalid={errorMessage !== undefined}
    >
      {children}
      <FormErrorMessage fontSize='xs' mt={'0.5'} color={'red.500'}>{ errorMessage }</FormErrorMessage>
    </FormControl>
)

 // eslint-disable-next-line react/display-name
export const InputWithError = forwardRef<InputProps & { errorMessage?: string, label? : string }, 'input'>(({ errorMessage, label, ...inputProps }, ref) => {
  return (
    <InputErrorWrapper errorMessage={errorMessage}>
      { label ? (<FormLabel>{ label }</FormLabel>) : null }
      <Input 
        aria-invalid={false}
        { ...inputProps }
        ref={ref}
      />     
    </InputErrorWrapper>
  );
});
