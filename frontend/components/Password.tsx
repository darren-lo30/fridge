import { forwardRef, Input, InputGroup, InputRightElement, Button, InputProps } from "@chakra-ui/react";
import { useState } from "react"
import { InputErrorWrapper } from "./InputWithError";

// eslint-disable-next-line react/display-name
const Password = forwardRef<InputProps & { errorMessage? : string }, 'input'>(({ errorMessage, ...inputProps }, ref) => {
  const [ show, setShow ] = useState(false);
  
  return (
    <InputErrorWrapper errorMessage={errorMessage}>
      <InputGroup>
        <Input 
          rounded='5'
          type={show ? 'text' : 'password'} 
          placeholder='Password'
          ref={ref}
          { ...inputProps }
        >
        </Input>
        <InputRightElement width='4.5rem'>
          <Button h={'1.75rem'} size={'sm'} onClick={() => {setShow(!show)}}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    </InputErrorWrapper>
  );
});

export default Password;