import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
import AccessDenied from '../components/access-denied'
import Button from 'components/button'
import styled from 'styled-components'

const MyCourses = styled.div``

export default function Home() {
  const { data: session } = useSession()
  const [userContent, setContent] = useState('')
  const [universityData, setUniversityData] = useState('')
  const [universityName, setNewUniversityName] = useState('')

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/university/read')
      const json = await res.json()
      console.log(JSON.stringify(json))

      setUniversityData(json)
    }
    fetchData()
  }, [session])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/family/search?universityName=${universityName}`)
      const json = await res.json()
      console.log('hii')
      setContent(json[0])

      // if (json.content) {
      //   setContent(json.content)
      // }
    }
    fetchData()
  }, [session])

  // If session exists, display content
  return (
    <Layout>
      <h1>Family Search</h1>
      <p>
        <strong>{JSON.stringify(userContent) ?? '\u00a0'}</strong>
      </p>
      <p>Name: {userContent?.userName}</p>
      <p>Email: {userContent?.email}</p>
      <p>University: {userContent?.universityName}</p>
      <p>City: {userContent?.city}</p>

      <Button link={'/home'} title={'Home Page'} />

      University: {'  '}
      <select
        value={universityName}
        onChange={(e) => setNewUniversityName(e.target.value)}
      >
        <option selected value=""></option>
        {universityData?.map((row) => (
          <option value={row.universityName}>{row.universityName}</option>
        ))}
      </select>



      {/* 
      <MyCourses>

      </MyCourses> */}
    </Layout>
  )
}
