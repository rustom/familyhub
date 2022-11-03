import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './header.module.css'
import { LogoGoogle } from 'react-ionicons'
import styled from 'styled-components'
import theme from 'styles/theme'
import { motion } from 'framer-motion'

// const Box = styled(motion.div)`
//   margin: auto;
//   padding: 0 20px 0 20px;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   background-color: ${theme.colors.accent};
//   border-radius: 0.6rem;
// `

// const Box = styled(motion.div)`
//   margin: 10px;
//   max-width: 400px;
//   padding: 0 15px 0 15px;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   background-color: ${theme.colors.accent};
//   border-radius: 0.6rem;
// `

const ButtonLink = styled(Link)``

// const ButtonText = styled.a`
//   text-decoration: underline;
//   // color: ${theme.colors.buttonText};
// `

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
