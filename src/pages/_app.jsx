import { SessionProvider } from 'next-auth/react'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

const config = {
  initialColorMode: 'Dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}
