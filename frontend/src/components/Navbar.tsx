import { Box, Link, Flex, Text, Menu, MenuButton, MenuItem, HStack, IconButton, useDisclosure, Stack, Center, useColorModeValue, LinkProps, Avatar, MenuList, MenuDivider} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import appConfig from "@configs/appConfig";
import Logo from "@components/Logo";
import { useUser } from "@contexts/UserProvider";
import { Bounds } from "./Bounds";

export type NavbarProps = {
  navLinks: Array<{ href: string, label: string}>,
  profileLinks: Array<{ href: string, label: string}>
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

const Navbar = ({ navLinks, profileLinks }: NavbarProps) =>{
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
              <Logo mb={1} mr={1.5} h={'8'} w={'800'}/>
              <Text fontSize={30} fontWeight='bold'>
                { appConfig.appName }
              </Text>
            </Center>
          </Link>

          {/* Displays the links if the user is signed in */}
          
          <HStack
            as={'nav'}
            gap={2}
            display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
            ))}
 
            {user ? (
            <Menu
              placement="bottom-end"
            >   

              <MenuButton
                rounded={'full'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  name = { user.fullName}
                />
              </MenuButton>
              <MenuList
                left={0}
              >
                <Box px='0.8rem'>
                  <Text>Hello <Text as='span' fontWeight={'bold'}>{user.fullName}</Text></Text>
                </Box>
                <MenuDivider/>
                {profileLinks.map((link) => (
                  <Link key={link.href} href={link.href} _hover={{textDecoration: 'none'}}>
                    <MenuItem  >
                      { link.label }
                    </MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
            ) : null }
          </HStack>
          
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