import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './header.module.css'
import { LogoGoogle } from 'react-ionicons'
import styled from 'styled-components'
import theme from 'styles/theme'
import { motion } from 'framer-motion'

const Box = styled(motion.div)`
  margin: auto;
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.accent};
  border-radius: 0.6rem;
`

const Button = styled.a`
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonText = styled.p`
  font-size: 25px;
  color: ${theme.colors.buttonText};
`

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function SignInButton() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <Box>
      <Button
        // whileHover={{ scale: 1.1 }}
        // whileTap={{ scale: 0.9 }}
        animate={{ backgroundColor: '#000' }}
        href={`/api/auth/signin`}
        onClick={(e) => {
          e.preventDefault()
          signIn()
        }}
      >
        <LogoGoogle
          height="35px"
          width="35px"
          color="#ffffff"
          style={{ padding: '10px' }}
        />
        <ButtonText>Sign In</ButtonText>
      </Button>
      {/* {session?.user && (
          <>
            {session.user.image && (
              <span
                style={{
                  backgroundImage: `url('${session.user.image}')`,
                }}
                className={styles.avatar}
              />
            )}
            <span className={styles.signedInText}>
              <small>Signed in as</small>
              <br />
              <strong>{session.user.email ?? session.user.name}</strong>
            </span>
            <a
              href={`/api/auth/signout`}
              className={styles.button}
              onClick={(e) => {
                e.preventDefault()
                signOut()
              }}
            >
              Sign out
            </a>
          </>
        )} */}
    </Box>
  )
}
