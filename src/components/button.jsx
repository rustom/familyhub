import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './header.module.css'
import { LogoGoogle } from 'react-ionicons'
import styled from 'styled-components'

const ButtonLink = styled(Link)``

export default function Button({ link, title }) {
  return (
    // <Box>
    <ButtonLink href={link}>
      {/* <ButtonText> */}

      {title}
      {/* </ButtonText> */}
    </ButtonLink>
    // </Box>
  )
}
