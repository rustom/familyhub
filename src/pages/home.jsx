import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
import AccessDenied from '../components/access-denied'
import Button from 'components/button'
import styled from 'styled-components'

const MyCourses = styled.div``

export default function Home() {
  const { data: session } = useSession()
  const [userContent, setContent] = useState()

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/user/read')
      const json = await res.json()
      console.log(JSON.stringify(json))
      setContent(json[0])

      // if (json.content) {
      //   setContent(json.content)
      // }
    }
    fetchData()
  }, [session])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch('/api/family/search')
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
      <h1>Home Page</h1>
      <p>
        <strong>{JSON.stringify(userContent) ?? '\u00a0'}</strong>
      </p>
      <p>Name: {userContent?.userName}</p>
      <p>Email: {userContent?.email}</p>
      <p>University: {userContent?.universityName}</p>
      <p>City: {userContent?.city}</p>

      <Button link={'/new-family'} title={'New Family'} />
      <Button link={'/join-family'} title={'Join Family'} />
      <Button link={'/stats'} title={'Site Statistics'} />
      <Button link={'/user-settings'} title={'User Settings'} />
      {/* 
      <MyCourses>

      </MyCourses> */}
    </Layout>
  )
}
