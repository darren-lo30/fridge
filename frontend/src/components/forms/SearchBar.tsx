import { Input, InputProps } from "@chakra-ui/react";

export const SearchBar = (props: InputProps) => (
  <Input 
    type='search' 
    placeholder='Search' 
    name='search' 
    rounded='full' 
    borderColor='transparent' 
    backdropFilter={'brightness(0.90)'}
    borderWidth='2px'
    _active={{
      borderColor: 'primary.700'
    }}
    _hover={{
      borderColor: 'primary.600'
    }}
    _focus={{
      borderColor: 'primary.600'
    }}
    _focusVisible={{
      borderColor: 'primary.600',
    }}
    {...props}
  />
)