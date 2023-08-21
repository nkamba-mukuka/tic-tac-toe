import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: '400',
    borderRadius: 'base',
    _focus: {
      boxShadow: 'none',
    },
  },
  sizes: {
    sm: {},
    md: {},
    lg: {
      height: '3em',
    },
  },
  variants: {
    outline: {
      border: '1px solid',
      borderColor: 'primary.main',
      color: 'black',
      _hover: {
        bg: 'primary.light',
      },
    },
    solid: {
      bg: 'primary.main',
      color: 'white',
      _hover: {
        bg: 'orange.400',
      },
    },
    text: {
      border: 'none',
      color: 'inherit',
      background: '#222',
      _hover: {
        bg: 'primary.main',
      },
    },
  },
  defaultProps: {
    size: 'lg',
    variant: 'text',
  },
};
