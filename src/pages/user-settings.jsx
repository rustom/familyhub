import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
import styled from 'styled-components'
import { Heading, Text, FormControl, Input, Select, FormLabel, Button } from '@chakra-ui/react'


const MyCourses = styled.div``

export default function UserSettings() {
  const { data: session } = useSession()
  const [universityData, setUniversityData] = useState()
  const [userContent, setUserContent] = useState()
  const [submitted, setSubmitted] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/user/read')
      const json = await res.json()
      console.log(JSON.stringify(json))

      setUserContent(json[0])
      setNewName(json[0].userName)
      setNewUniversityName(json[0].universityName)
    }
    fetchData()
  }, [submitted])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/university/read')
      const json = await res.json()
      console.log(JSON.stringify(json))

      setUniversityData(json)
    }
    fetchData()
  }, [session])

  const [userName, setNewName] = useState('')
  const [universityName, setNewUniversityName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const postData = async () => {
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        body: JSON.stringify({
          userName: userName,
          universityName: universityName,
        }),
      })
      await res.json()
    }
    postData()

    alert('Thanks for submitting! Your info should now be updated.')
    setSubmitted(submitted + 1)
  }

  // If session exists, display content
  return (
    <Layout>
      <Heading>User Settings</Heading>
      <Text>
        Change your settings below. Your email cannot be changed because it is
        linked to your sign in.
      </Text>
      <FormControl onSubmit={handleSubmit}>
        <Text>
          Name:
        </Text>
        <FormLabel>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </FormLabel>
        <br />
        <FormLabel>
          {/* <input type="text" value={newUniversityName} onChange={(e) => setNewUniversityName(e.target.value)} /> */}
          University: {'  '}
          <Select
            value={universityName}
            onChange={(e) => setNewUniversityName(e.target.value)}
          >
            <option selected value=""></option>
            {universityData?.map((row) => (
              <option value={row.universityName}>{row.universityName}</option>
            ))}
          </Select>
        </FormLabel>
        <br />
        <Button onClick={handleSubmit}>Submit</Button>
      </FormControl>
      {/* 
      <MyCourses>

      </MyCourses> */}
    </Layout>
  )
}
