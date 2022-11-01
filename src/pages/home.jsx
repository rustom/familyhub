import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
import AccessDenied from '../components/access-denied'
import Button from 'components/button'

export default function Home() {
  const { data: session } = useSession()
  const [content, setContent] = useState()

  // Fetch content from protected route
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch('/api/examples/database')
  //     const json = await res.json()
  //     console.log('hii')
  //     setContent(json[0])

  //     // if (json.content) {
  //     //   setContent(json.content)
  //     // }
  //   }
  //   fetchData()
  // }, [session])

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{JSON.stringify(content) ?? '\u00a0'}</strong>
      </p>

      <Button link={'/new-family'} title={'bruh'} />
      <p>
        asdfasdf
      </p>
    </Layout>
  )
}
