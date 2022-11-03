import { createGlobalStyle } from 'styled-components'
import theme from 'styles/theme'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: IBM Plex Sans;

    a {
      text-decoration: none;
      :link {
        color: ${theme.colors.accent};
      }
      :visited {
        color: ${theme.colors.accent};
      }
      :hover {
        color: ${theme.colors.accent};
        text-decoration: underline;
      }
      :active {
        color: ${theme.colors.accent};
      }
    }
  };
`

export default GlobalStyle
