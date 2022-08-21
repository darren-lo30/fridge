import { Button, ButtonProps, Link, LinkProps, useToken } from "@chakra-ui/react";
import React from "react";

type Direction = 'left' | 'right' | 'top' | 'bottom';


const createAnimationProps = (primary: string, secondary: string, toDirection: Direction) : Partial<ButtonProps & LinkProps>  => {
  if(toDirection == 'left' || toDirection=='right') {
    return {
      backgroundSize:'250% 100%',
      backgroundPosition: toDirection,
      backgroundImage: `linear-gradient(to ${toDirection === 'left' ? 'right' : 'left'}, ${primary} 50%, ${secondary} 50%)`,
      transition:'background-position 0.5s',
      _hover: {
        backgroundPosition: toDirection === 'right' ? '0' : '100%',
      } 
    }
  }


  return {
    backgroundSize:'100% 250%',
    backgroundPosition: toDirection,
    backgroundImage: `linear-gradient(to ${toDirection === 'top' ? 'bottom' : 'top'}, ${primary} 50%, ${secondary} 50%)`,
    transition:'background-position 0.5s',
    _hover: {
      backgroundPosition: toDirection === 'top' ? '0 100%' : '0 0',
    } 
  }
}

const sharedStyles : Partial<ButtonProps & LinkProps> = {
  _active:{
    bg: 'secondary.light'
  },
  rounded:'5',
  py:'1',
  px:'3',
}

export const FridgeButton = (props: ButtonProps & {slideDirection?: Direction}) => {
  const [primary, secondary] = useToken(
    'colors',
    ['primary.main', 'secondary.main']
  )

  return (
  <Button
    { ...createAnimationProps(primary, secondary, props.slideDirection || 'right' )}
    { ...sharedStyles }
    
    { ...props }
  >
  {props.children}
  </Button>
  );
}

export const FridgeLink = (props: LinkProps & {slideDirection?: Direction}) => {
  const [primary, secondary] = useToken(
    'colors',
    ['primary.main', 'secondary.main']
  )
  return (
    <Link
      {...createAnimationProps(primary, secondary, props.slideDirection || 'right')}
      { ...sharedStyles }
      { ...props }
    >
    {props.children}
    </Link>
  );
}
