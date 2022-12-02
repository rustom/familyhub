import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
import styled from 'styled-components'
import {
  FormControl,
  Heading,
  Text,
  FormLabel,
  Select,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Divider,
} from '@chakra-ui/react'

export default function JoinFamily() {
  const { data: session } = useSession()
  const [universityData, setUniversityData] = useState()
  const [userContent, setUserContent] = useState()
  const [submitted, setSubmitted] = useState()
  const [leaderKeyword, setLeaderKeyword] = useState('')
  const [subscriptionServices, setSubscriptionServices] = useState()
  const [subscriptionService, setSubscriptionService] = useState()
  const [familyData, setFamilyData] = useState()

  const [userName, setNewName] = useState('')
  const [universityName, setNewUniversityName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/user/read')
      const json = await res.json()
      // console.log(JSON.stringify(json))

      setUserContent(json[0])
      setNewName(json[0].userName)
      setNewUniversityName(json[0].universityName)
    }
    fetchData()
  }, [session])

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
      const json = await res.json()
      setSubscriptionServices(json)
      setSubscriptionService(json[0].serviceName)
    }
    fetchData()
  }, [session])

  useEffect(() => {
    const fetchData = async () => {
      // if (subscriptionService)
      const res = await fetch(
        `/api/family/search?universityName=${universityName}&leaderKeyword=${leaderKeyword.toLowerCase()}&serviceName=${encodeURIComponent(
          subscriptionService || ''
        )}`
      )
      setFamilyData(await res.json())
    }
    fetchData()
  }, [universityName, subscriptionService, leaderKeyword])

  const handleSubmit = (event) => {
    console.log(event)

    const postData = async () => {
      const res = await fetch('/api/membership/create', {
        method: 'POST',
        body: JSON.stringify({
          memberID: userContent.userID,
          familyID: event,
        }),
      })
      await res.json()
    }
    postData()

    alert('Thanks for submitting! Your info should now be updated.')
    setSubmitted(submitted + 1)
  }

  const handleAutoJoin = (serviceName) => {
    console.log(serviceName)

    const postData = async () => {
      const res = await fetch('/api/membership/auto-join', {
        method: 'POST',
        body: JSON.stringify({
          memberID: userContent.userID,
          serviceName: serviceName,
        }),
      })
      await res.json()
    }
    postData()

    alert('Auto-joined a family! Your info should now be updated.')
  }

  // If session exists, display content
  return (
    <Layout>
      <Heading>Family Search</Heading>
      <Text>
        Input your family search settings below. You can input the subscription
        service type that you are looking for and/or a keyword search for the
        name of the leader of your family.
      </Text>
      <FormLabel>
        {/* <input type="text" value={newUniversityName} onChange={(e) => setNewUniversityName(e.target.value)} /> */}
        Subscription Serivce: {'  '}
        <Select
          value={subscriptionService}
          onChange={(e) => setSubscriptionService(e.target.value)}
        >
          {/* <option value={''}></option> */}
          {subscriptionServices?.map((row) => (
            <option value={row.serviceName}>{row.serviceName}</option>
          ))}
        </Select>
      </FormLabel>
      <br /> <br />
      <FormLabel>
        Leader name keyword (optional):{'  '}
        <Input
          value={leaderKeyword}
          onChange={(e) => setLeaderKeyword(e.target.value)}
        />
      </FormLabel>
      <br /> <br />
      <Button onClick={() => handleAutoJoin(subscriptionService)}>Auto-Join</Button>
      <br /> <br />

      {/* <input type="submit" value="Submit" /> */}
      {/* </form> */}
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Family ID</Th>
            <Th>Subscription Service</Th>
            <Th>Leader Name</Th>
            <Th>Access Type</Th>
            <Th>Current Members</Th>
            <Th>Max Members</Th>
            <Th>Request to join</Th>
          </Tr>
        </Thead>
        <Tbody>
          {familyData?.map(
            (row) =>
              row.familyID && (
                <Tr>
                  <Td>{row.familyID}</Td>
                  <Td>{row.serviceName}</Td>
                  <Td>{row.leaderName}</Td>
                  <Td>{row.accessType}</Td>
                  <Td>{row.numMembers}</Td>
                  <Td>{row.maxMembers}</Td>
                  <Td>
                    {row.accessType === 'Open' && (
                      <Button
                        id={row.familyID}
                        onClick={() => handleSubmit(row.familyID)}
                      >
                        Request
                      </Button>
                    )}
                  </Td>
                </Tr>
              )
          )}
        </Tbody>
      </Table>
    </Layout>
  )
}
