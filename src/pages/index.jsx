import Layout from '../components/layout'
import styled from 'styled-components'
import GlobalStyle from 'styles/global-style'
import theme from 'styles/theme'
import SignInButton from 'components/sign-in-button'

const Background = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  algin-items: center;

  background-color: ${theme.colors.background};

  // background: linear-gradient(35deg, #f17c58, #e94584, #24aadb, #ff3706);
  background: linear-gradient(35deg, #735cdd, #9000b3, #7e007b, #37000a);

  background-size: 600% 100%;
  animation: gradient 8s linear infinite;
  animation-direction: alternate;
  @keyframes gradient {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }
`

const Box = styled.div`
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 800px;
`

const Title = styled.h1`
  font-size: 80px;
`

const Text = styled.p`
  font-size: 20px;
`

const Link = styled.a``

export default function IndexPage() {
  return (
    <>
      <GlobalStyle />
      <Background>
        <Box>
          <Title>Welcome to FamilyHub!</Title>
          <Text>
            Thank you for visiting our CS 411 project! FamilyHub is an online
            service that connects university students who hate overpaying for
            individual streaming services. With FamilyHub, students can create
            or join family plans that reduce the cost of streaming services for
            all members.
          </Text>
          <Text>
            Please note that in its current state, your email must be
            whitelisted to access our site. If you are unable to login, please
            contact{' '}
            <a
              href={
                'mailto:rustomi2@illinois.edu?subject=A personalized, funny message for Rustom Ichhaporia'
              }
              aria-label="Email Link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rustom Ichhaporia
            </a>
            .
          </Text>
          <SignInButton />
        </Box>
      </Background>
    </>
  )
}
