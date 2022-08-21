import { NavbarProps } from "@components/Navbar";

export const authedNavLinks : NavbarProps['navLinks'] = [
  {
    href: '/fridge',
    label: 'My Fridge'
  }, {
    href: '/shop',
    label: 'My Shop'
  },
  {
  href: '/recipes',
  label: 'My Recipes'
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

