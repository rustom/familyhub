import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
import styled from 'styled-components'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'

const MyCourses = styled.div``

export default function Home() {
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

  // const handleChange = (event) => {
  //   const name = event.target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

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
      <h1>User Settings</h1>
      <p>Name: {userContent?.userName}</p>
      <p>Email: {userContent?.email}</p>
      <p>University: {userContent?.universityName}</p>
      <p>City: {userContent?.city}</p>
      <form onSubmit={handleSubmit}>
        <h2>
          Change your settings below. Your email cannot be changed because it is
          linked to your sign in.
        </h2>
        <label>
          Name:{'  '}
          <input
            type="text"
            value={userName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        <br /> <br />
        <label>
          {/* <input type="text" value={newUniversityName} onChange={(e) => setNewUniversityName(e.target.value)} /> */}
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
        </label>
        <br /> <br />
        <input type="submit" value="Submit" />
      </form>
      {/* 
      <MyCourses>

      </MyCourses> */}
    </Layout>
  )
}
