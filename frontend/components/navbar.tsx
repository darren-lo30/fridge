import { Box, Link, Flex, Text, HStack, IconButton, useDisclosure, Stack, Center, useColorModeValue, LinkProps} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import appConfig from "@configs/appConfig";
import Logo from "@components/logo";

export type NavbarProps = {
  children: React.ReactNode,
  navLinks: {
    left: Array<{ href: string, label: string}>
    right: Array<{ href: string, label: string}>
  }
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

const Navbar = ({ children, navLinks}: NavbarProps) =>{
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box 
        px={3} 
        bg={useColorModeValue('gray.100', 'gray.900')} 
        alignItems={'center'} 
        pos={'relative'}
      >
        <Box maxWidth={1280} marginLeft={'auto'} marginRight={'auto'}>
          <Box pos={'relative'} >  
            <IconButton 
              // size={'md'} 
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} 
              aria-label={"Open Menu"} 
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
              pos={'absolute'}
              top={'50%'}
              transform={'translateY(-50%)'}
              >
            </IconButton>

            {/* Centered links with logo */}
            <Flex h={16} alignItems={'center'} justifyContent={'center'}>
              <HStack alignItems={'center'} spacing={0}>
                <HStack
                  as={'nav'}
                  gap={2}
                  display={{ base: 'none', md: 'flex' }}>
                  {navLinks.left.map((link) => (
                    <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                  ))}

                </HStack>

                {/* Centered logo */}
                <Center px={8} mx={0}>
                  <Logo color={'red'} mr={2} />
                  <Text fontSize={25}>
                    { appConfig.appName }
                  </Text>
                </Center>
                
                <HStack
                  as={'nav'}
                  gap={2}
                  display={{ base: 'none', md: 'flex' }}>
                  {navLinks.right.map((link) => (
                    <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                  ))}
                </HStack>
              </HStack>
            </Flex>

            {/* Right aligned links */}
            <HStack 
              gap={3}
              pos={'absolute'} 
              right={0}
              top={'50%'}
              transform={'translateY(-50%)'}
              display={{base: 'none', md: 'flex'}}
            >
              <NavLink>Sign In</NavLink>
              <NavLink>Sign Up</NavLink>
            </HStack>
          </Box>
        </Box>

        {/* Mobile drop down navbar */}
        {
          isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                <Flex direction={'column'} alignItems={'center'}>
                  {[...navLinks.left, ...navLinks.right].map((link) => (
                    <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                  ))}
                </Flex>
              </Stack>    
            </Box>
          ) : null
        }
      </Box>
      {children}
    </>
  )
}


export default Navbar;