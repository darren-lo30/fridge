import { NavbarProps } from "@components/navbar";

const authedNavLinks : NavbarProps['navLinks'] = {
  left: [{
    href: '/fridge',
    label: 'My Fridge'
  }, {
    href: '/shop',
    label: 'My Shop'
  }],
  right: [{
    href: '/recipes',
    label: 'My Recipes'
  }, {
    href: 'account',
    label: 'My Account'
  }]
}

const nonAuthedNavLinks : NavbarProps['navLinks'] = {
  left: [],
  right: []
}


export { authedNavLinks, nonAuthedNavLinks }