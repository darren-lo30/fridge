import { NavbarProps } from "@components/Navbar";

export const authedNavLinks : NavbarProps['navLinks'] = [
  {
    href: '/fridge',
    label: 'My Fridge'
  },
  {
  href: '/recipes',
  label: 'Recipes'
  }, 
];

export const profileLinks : NavbarProps['navLinks'] = [
  {
    href: 'account',
    label: 'My Account'
  },
  { 
    
    href: '/sign-out',
    label: 'Sign Out'
  }
]

export const nonAuthedNavLinks : NavbarProps['navLinks'] = []

export const nonAuthedRoutes = [
  '/sign-in',
  '/sign-out',
  '/'
]