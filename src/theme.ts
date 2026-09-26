import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f5e8ff',
      100: '#dcb2ff',
      200: '#c37dff',
      300: '#a947ff',
      400: '#9012ff',
      500: '#7700e6',
      600: '#5c00b4',
      700: '#420082',
      800: '#270051',
      900: '#0e0021',
    },
    darkBg: {
      main: '#0a0a0a',
      surface: '#121212',
      surfaceHover: '#1c1c1c',
      border: '#2a2a2a'
    }
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: 'darkBg.main',
        color: 'whiteAlpha.900',
        letterSpacing: 'tight'
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'full',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorScheme === 'teal' ? 'brand.500' : undefined,
          color: 'white',
          _hover: {
            bg: props.colorScheme === 'teal' ? 'brand.400' : undefined,
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          transition: 'all 0.2s',
        }),
        ghost: {
          _hover: {
            bg: 'whiteAlpha.100',
          }
        }
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            color: 'whiteAlpha.600',
            borderBottom: '1px solid',
            borderColor: 'darkBg.border',
            textTransform: 'none',
            letterSpacing: 'normal',
            fontSize: 'sm'
          },
          td: {
            borderBottom: '1px solid',
            borderColor: 'darkBg.border',
          },
          tbody: {
            tr: {
              _hover: {
                bg: 'whiteAlpha.50',
              },
              transition: 'background 0.2s'
            }
          }
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: 'darkBg.surface',
            borderColor: 'darkBg.border',
            _hover: {
              borderColor: 'brand.400',
            },
            _focus: {
              borderColor: 'brand.400',
              boxShadow: '0 0 0 1px #9012ff',
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'darkBg.surface',
          borderColor: 'darkBg.border',
          borderWidth: '1px',
          borderRadius: 'xl',
          boxShadow: 'xl',
        }
      }
    }
  },
});

export default theme;
