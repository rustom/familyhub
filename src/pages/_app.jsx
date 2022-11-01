import { SessionProvider } from 'next-auth/react'
// import './styles.css'

import { AppProps } from 'next/app'
import { Session } from 'next-auth'

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
