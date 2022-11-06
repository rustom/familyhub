import Header from './header'
import styled from 'styled-components'
import theme from 'styles/theme'
import AccessDenied from './access-denied'
import { useSession } from 'next-auth/react'
import Navigation from './navigation'
import { Flex, Heading, useColorMode, Button, Text, Center, Container, VStack, Link, Divider } from '@chakra-ui/react'


const Wrapper = styled.main`
  margin: 0;
  padding: 0;
  width: 100%;
  // height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  algin-items: center;

  // background-color: ${theme.colors.background};

  // background: linear-gradient(35deg, #f17c58, #e94584, #24aadb, #ff3706);
  // background-size: 600% 100%;
  // animation: gradient 8s linear infinite;
  // animation-direction: alternate;
  // @keyframes gradient {
  //   0% {
  //     background-position: 0%;
  //   }
  //   100% {
  //     background-position: 100%;
  //   }
  // }
`

// const ContentBox = styled.div`
//   margin: auto;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   // text-align: center;
//   max-width: 1000px;
// `

export default function Layout({ children }) {
  const { data: session } = useSession()

  return (
    <Flex height='100vh' flex-direction='column' justifyContent='flex-start' alignItems='flex-start'>
      {/* <Wrapper> */}
      {/* <Center> */}
      {!session && <AccessDenied />}
      {session && (
        <Container maxW={'1000px'}>
          <Navigation />
          {/* <Divider /> */}
          <VStack alignItems='flex-start'>

            {children}

            {/* <Divider /> */}
          </VStack>
          <Header />
        </Container>
      )}
      {/* </Wrapper> */}
      {/* </Center> */}
    </Flex>
  )
}
