import { Box, Link, Flex, Text, HStack, IconButton, useDisclosure, Stack, Center, useColorModeValue, LinkProps} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import appConfig from "@configs/appConfig";
import Logo from "@components/Logo";
import { useUser } from "@contexts/UserProvider";
import { Bounds } from "./Bounds";

export type NavbarProps = {
  navLinks: Array<{ href: string, label: string}>
}

const NavLink = (props: LinkProps) => (
  <Link
    px={2}
    py={2}
    rounded={2}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.800')
    }}
    {...props}
  >
    { props.children }
  </Link>
)

const Navbar = ({ navLinks}: NavbarProps) =>{
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  return (
    <Bounds>
      <Box pos={'relative'} >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Link 
            href={'/'}
            _hover={{
              textDecoration: 'none'
            }}
          >
            <Center>
              <Logo color={'red'} mr={2} />
              <Text fontSize={25}>
                { appConfig.appName }
              </Text>
            </Center>
          </Link>

          {/* Displays the links if the user is signed in */}
          { user ? (
            <HStack
              as={'nav'}
              gap={2}
              display={{ base: 'none', md: 'flex' }}>
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
              ))}

            </HStack>
          ) : null }

          <IconButton 
            size={'md'} 
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} 
            aria-label={"Open Menu"} 
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            bg={'transparent'}
            >
          </IconButton>
        </Flex>
      </Box>
      {/* Mobile drop down navbar */}
      {
        isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Flex direction={'column'}>
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                ))}
              </Flex>
            </Stack>    
          </Box>
        ) : null
      }
    </Bounds>
  )
}


export default Navbar;