import { NavbarProps } from "@components/Navbar";

const authedNavLinks : NavbarProps['navLinks'] = [
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
  {
    href: 'account',
    label: 'My Account'
  }
];

const nonAuthedNavLinks : NavbarProps['navLinks'] = []

export { authedNavLinks, nonAuthedNavLinks }