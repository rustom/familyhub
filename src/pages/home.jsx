import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
import AccessDenied from '../components/access-denied'
// import Button from 'components/button'
import styled from 'styled-components'
import {
  Heading,
  Text,
  VStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Divider,
} from '@chakra-ui/react'

const MyCourses = styled.div``

// const Table = styled.table`
//   text-align: left;
//   // border: 1px solid white;
//   // border-collapse: collapse;
//   border-collapse: collapse;
//   th {
//     border-bottom: 1px solid white;
//     // border-radius: 15px;
//   }
//   th,
//   Td {
//     border-bottom: 1px solid white;
//     padding: 10px;
//   }
// `

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
    // event.prevenTdefault()

    if (isLeader) {
      // const posTdata = async () => {
      //   const res = await fetch('/api/family/delete', {
      //     method: 'DELETE',
      //     body: JSON.stringify({
      //       memberID: userContent.userID,
      //       familyID: event
      //     }),
      //   })
      //   await res.json()
      // }
      // posTdata()
      alert(
        `Unfortunately, you currently can't leave a family if you are the leader.`
      )
    } else {
      const postData = async () => {
        const res = await fetch('/api/membership/delete', {
          method: 'DELETE',
          body: JSON.stringify({
            memberID: userContent.userID,
            familyID: event,
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
      <Heading>Home Page</Heading>
      <Text>Name: {userContent?.userName}</Text>
      <Text>Email: {userContent?.email}</Text>
      <Text>University: {userContent?.universityName}</Text>
      <Text>City: {userContent?.city}</Text>

      <Divider />

      <Heading>Current Families</Heading>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Family ID</Th>
            <Th>Subscription Service</Th>
            <Th>Leader</Th>
            <Th>Access Type</Th>
            <Th>Current Members</Th>
            <Th>Max Members</Th>
            <Th>Leave Family</Th>
          </Tr>
        </Thead>
        <Tbody>
          {familyData?.map(
            (row) =>
              row.familyID && (
                <Tr>
                  <Td>{row.familyID}</Td>
                  <Td>{row.serviceName}</Td>
                  <Td>
                    {row.leaderName && row.leaderName === userContent.userName
                      ? 'Yes'
                      : 'No'}
                  </Td>
                  <Td>{row.accessType}</Td>
                  <Td>{row.numMembers}</Td>
                  <Td>{row.maxMembers}</Td>
                  <Td>
                    {row.accessType === 'Open' && (
                      <Button
                        id={row.familyID}
                        onClick={() =>
                          handleLeave(
                            row.familyID,
                            row.leaderName === userContent.userName
                              ? true
                              : false
                          )
                        }
                      >
                        Leave
                      </Button>
                    )}
                  </Td>
                </Tr>
              )
          )}
        </Tbody>
      </Table>
      {/* 
      <MyCourses>

      </MyCourses> */}
    </Layout>
  )
}
