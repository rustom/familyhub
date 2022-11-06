import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './header.module.css'
import styled from 'styled-components'
import Button from './button'

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

const Box = styled.div`
  // max-width: 800px;
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      {!session && (
        <Box>
          <span className={styles.notSignedInText}>You are not signed in</span>
          <a
            href={`/api/auth/signin`}
            className={styles.buttonPrimary}
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Sign in
          </a>
        </Box>
      )}
      {session?.user && (
        <Box>
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
          <Button
            link={`/api/auth/signout`}
            title={'Sign Out'}
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          />
        </Box>
      )}
    </header>
  )
}
