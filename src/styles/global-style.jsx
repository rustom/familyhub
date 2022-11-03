import { createGlobalStyle } from 'styled-components'
import theme from 'styles/theme'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: IBM Plex Sans;

    a {
      // text-decoration: none;
      :link {
        color: ${theme.colors.accent};
      }
      :visited {
        color: ${theme.colors.accent};
      }
      :hover {
        color: ${theme.colors.text};
        text-decoration: underline;
      }
      :active {
        color: ${theme.colors.text};
      }
    }
  };
`

export default GlobalStyle
