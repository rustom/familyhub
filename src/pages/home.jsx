import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
import AccessDenied from '../components/access-denied'
import Button from 'components/button'
import styled from 'styled-components'

const MyCourses = styled.div``

const Table = styled.table`
  text-align: left;
  // border: 1px solid white;
  // border-collapse: collapse;
  border-collapse: collapse;
  th {
    border-bottom: 1px solid white;
    // border-radius: 15px;
  }
  th,
  td {
    border-bottom: 1px solid white;
    padding: 10px;
  }
`

export default function Home() {
  const { data: session } = useSession()
  const [userContent, setContent] = useState()
  const [familyData, setFamilyData] = useState()
  const [submitted, setSubmitted] = useState()

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
      const res = await fetch('/api/family/read')
      const json = await res.json()
      console.log(JSON.stringify(json))
      setFamilyData(json)

      // if (json.content) {
      //   setContent(json.content)
      // }
    }
    fetchData()
  }, [session, submitted])

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

  const handleLeave = (event, isLeader) => {
    // event.preventDefault()

    if (isLeader) {
      // const postData = async () => {
      //   const res = await fetch('/api/family/delete', {
      //     method: 'DELETE',
      //     body: JSON.stringify({
      //       memberID: userContent.userID,
      //       familyID: event
      //     }),
      //   })
      //   await res.json()
      // }
      // postData()
      alert(`Unfortunately, you currently can't leave a family if you are the leader.`)
    } else {
      const postData = async () => {
        const res = await fetch('/api/membership/delete', {
          method: 'DELETE',
          body: JSON.stringify({
            memberID: userContent.userID,
            familyID: event
          }),
        })
        await res.json()
      }
      postData()
      alert('Thanks for submitting! Your info should now be updated.')
    }


    setSubmitted(submitted + 1)
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Home Page</h1>
      <p>Name: {userContent?.userName}</p>
      <p>Email: {userContent?.email}</p>
      <p>University: {userContent?.universityName}</p>
      <p>City: {userContent?.city}</p>

      {/* <div><p>Hello! </p>{familyData?.map((row) => <p>{JSON.stringify(row)}</p>)}</div> */}
      <h2>
        Current Families
      </h2>
      <Table>
        <tr>
          <th>Family ID</th>
          <th>Subscription Service</th>
          <th>Leader</th>
          <th>Access Type</th>
          <th>Current Members</th>
          <th>Max Members</th>
          <th>Leave Family</th>
        </tr>
        {
          familyData?.map((row) => (
            row.familyID &&
            <tr>
              {/* <td>{JSON.stringify(row)}</td> */}
              <td>{row.familyID}</td>
              <td>{row.serviceName}</td>
              <td>{row.leaderName && row.leaderName === userContent.userName ? 'Yes' : 'No'}</td>
              <td>{row.accessType}</td>
              <td>{row.numMembers}</td>
              <td>{row.maxMembers}</td>
              <td>{row.accessType === 'Open' && <button id={row.familyID} onClick={() => handleLeave(row.familyID, row.leaderName === userContent.userName ? true : false)}>Leave</button>}</td>
            </tr>


            // { pendingUsersContent?.map((row) => (
            //   <tr>
            //     <td>{row.universityName}</td>
            //     <td>{row.numPending}</td>
            //   </tr>
            // ))}
          ))
        }
      </Table>
      {/* 
      <MyCourses>

      </MyCourses> */}
    </Layout>
  )
}
