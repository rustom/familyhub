import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
import styled from 'styled-components'

const MyCourses = styled.div``

export default function Home() {
  const { data: session } = useSession()
  const [universityData, setUniversityData] = useState()
  const [userContent, setUserContent] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/user/read')
      const json = await res.json()
      console.log(JSON.stringify(json))

      setUserContent(json[0])
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

  const [newName, setNewName] = useState('')
  const [newUniversityName, setNewUniversityName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert('A name was submitted: ' + newName);
    const name = target.name;

    this.setState({
      [name]: value
    });

    alert(name + ': ' + value + ' was submitted.')
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>User Settings</h1>
      <p>
        Name: {userContent?.userName}
      </p>
      <p>
        Email: {userContent?.email}
      </p>
      <p>
        University: {userContent?.universityName}
      </p>
      <p>
        City: {userContent?.city}
      </p>
      <form onSubmit={handleSubmit}>
        <h2>
          Change your settings:
        </h2>

        <label>
          Name:{'  '}
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </label>
        <br /> <br />
        <label>
          {/* <input type="text" value={newUniversityName} onChange={(e) => setNewUniversityName(e.target.value)} /> */}
          University: {'  '}
          <select>
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

