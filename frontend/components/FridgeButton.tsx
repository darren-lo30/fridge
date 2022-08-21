import { Button, ButtonProps, Link, LinkProps, useToken } from "@chakra-ui/react";

export const FridgeButton = (props: ButtonProps) => {
  const [primary, secondary] = useToken(
    'colors',
    ['primary.main', 'secondary.main']
  )
  return (
  <Button
    bg={'primary.main'}

    backgroundSize={'200% 100%'}
      backgroundPosition={'right'}
      backgroundImage={`linear-gradient(to left, ${primary} 50%, ${secondary} 50%)`}
      transition='background-position 0.5s'
      _hover={{
        backgroundPosition: '0 -100%',
      }} 
      _active={{
        bg: 'secondary.light'
      }}
    rounded={'5'}
    py={'1'}
    px={'3'}
    
    { ...props }
  >
  {props.children}
  </Button>
  );
}

export const FridgeLink = (props: LinkProps) => {
  const [primary, secondary] = useToken(
    'colors',
    ['primary.main', 'secondary.main']
  )
  return (
    <Link
      backgroundSize={'250% 100%'}
      backgroundPosition={'right'}
      backgroundImage={`linear-gradient(to left, ${primary} 50%, ${secondary} 50%)`}
      transition='background-position 0.5s'
      _hover={{
        backgroundPosition: '0 -100%',
      }} 
      _active={{
        bg: 'secondary.light'
      }}
      rounded={'5'}
      py={'1'}
      px={'3'}
      { ...props }
    >
    {props.children}
    </Link>
  );
}
