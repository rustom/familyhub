import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
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

export default function JoinFamily() {
  const { data: session } = useSession()
  const [universityData, setUniversityData] = useState()
  const [userContent, setUserContent] = useState()
  const [submitted, setSubmitted] = useState(0)
  const [leaderKeyword, setLeaderKeyword] = useState('')
  const [subscriptionSerivces, setSubscriptionServices] = useState()
  const [subscriptionService, setSubscriptionService] = useState()
  const [familyData, setFamilyData] = useState()

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
      setUniversityData(await res.json())
    }
    fetchData()
  }, [session])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/subscription-service/read`)
      setSubscriptionServices(await res.json())
    }
    fetchData()
  }, [session])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/family/search?universityName=${universityName}&leaderKeyword=${leaderKeyword.toLowerCase()}&serviceName=${subscriptionService}`)
      setFamilyData(await res.json())
    }
    fetchData()
  }, [submitted])

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

    // const postData = async () => {
    //   const res = await fetch('/api/user/update', {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //       userName: userName,
    //       universityName: universityName,
    //     }),
    //   })
    //   await res.json()
    // }
    // postData()

    // alert('Thanks for submitting! Your info should now be updated.')
    setSubmitted(submitted + 1)
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Family Search</h1>
      <p>Name: {userContent?.userName}</p>
      <p>Email: {userContent?.email}</p>
      <p>University: {userContent?.universityName}</p>
      <p>City: {userContent?.city}</p>
      <form onSubmit={handleSubmit}>
        <h2>
          Input your family search settings below. You can input the subscription service type that you are looking for and/or a keyword search for the name of the leader of your family.
        </h2>
        <label>
          {/* <input type="text" value={newUniversityName} onChange={(e) => setNewUniversityName(e.target.value)} /> */}
          Subscription Serivce: {'  '}
          <select
            value={subscriptionService}
            onChange={(e) => setSubscriptionService(e.target.value)}
          >
            <option value={''}></option>
            {subscriptionSerivces?.map((row) => (
              <option value={row.serviceName}>{row.serviceName}</option>
            ))}
          </select>
        </label>
        <br /> <br />
        <label>
          Leader name keyword:{'  '}
          <input
            type="text"
            value={leaderKeyword}
            onChange={(e) => setLeaderKeyword(e.target.value)}
          />
        </label>
        <br /> <br />

        <input type="submit" value="Submit" />
      </form>

      <Table>
        <tr>
          <th>Family ID</th>
          <th>Subscription Service</th>
          <th>Leader Name</th>
          <th>Access Type</th>
          <th>Current Members</th>
          <th>Max Members</th>
        </tr>
        {
          familyData?.map((row) => (
            <tr>
              {/* <td>{JSON.stringify(row)}</td> */}
              <td>{row.familyID}</td>
              <td>{row.serviceName}</td>
              <td>{row.leaderName}</td>
              <td>{row.accessType}</td>
              <td>{row.numMembers}</td>
              <td>{row.maxMembers}</td>
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
