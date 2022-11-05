import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
import AccessDenied from '../components/access-denied'
import Button from 'components/button'
import styled from 'styled-components'
import Navigation from 'components/navigation'

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

export default function NewFamily() {
  const { data: session } = useSession()
  const [userContent, setContent] = useState()
  const [userName, setNewName] = useState('')
  const [familyData, setFamilyData] = useState()
  const [submitted, setSubmitted] = useState()
  const [subscriptionService, setSubscriptionService] = useState('')
  const [subscriptionServices, setSubscriptionServices] = useState()
  const [accessType, setAccessType] = useState('Open')


  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/user/read')
      const json = await res.json()
      console.log(JSON.stringify(json))
      setContent(json[0])
      setNewName(json[0].userName)

      // if (json.content) {
      //   setContent(json.content)
      // }
    }
    fetchData()
  }, [session])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/subscription-service/read`)
      const json = await res.json()
      setSubscriptionServices(json)
      setSubscriptionService(json[0].serviceName)
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

  const submit = () => {
    const postData = async () => {
      const res = await fetch('/api/family/create', {
        method: 'POST',
        body: JSON.stringify({
          leaderID: userContent.userID,
          accessType: accessType,
          serviceName: subscriptionService
        }),
      })
      // await res.json()
    }
    postData()
  }

  const handleSubmit = (event) => {
    // event.preventDefault()

    // console.log(event.target)
    // console.log(event)

    // const postData = async () => {
    //   const res = await fetch('/api/family/create', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       leaderID: userContent.userID,
    //       accessType: accessType, 
    //       serviceName: subscriptionService
    //     }),
    //   })
    //   await res.json()
    // }
    // postData()
    // alert('Thanks for submitting! Your info should now be updated.')

    // setSubmitted(submitted + 1)
    submit();
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>New Family</h1>

      <form onSubmit={handleSubmit}>
        <h2>
          Here, you can create a new family that other users can join. Select which subscription service your family is for and whether you'd like your group to be open or closed. 
        </h2>
        <label>
          {/* <input type="text" value={newUniversityName} onChange={(e) => setNewUniversityName(e.target.value)} /> */}
          Subscription Serivce: {'  '}
          <select
            value={subscriptionService}
            onChange={(e) => setSubscriptionService(e.target.value)}
          >
            {/* <option value={''}></option> */}
            {subscriptionServices?.map((row) => (
              <option value={row.serviceName}>{row.serviceName}</option>
            ))}
          </select>
        </label>
        <br /> <br />
        <label>
          Access Type: {'  '}
          <select
            value={accessType}
            onChange={(e) => setAccessType(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
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
