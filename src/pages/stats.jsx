import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from 'components/layout'
import AccessDenied from '../components/access-denied'
import Button from 'components/button'
import styled from 'styled-components'
import { Heading, Table, Tr, Th, Tbody, Thead, Td } from '@chakra-ui/react'

export default function Stats() {
  const { data: session } = useSession()
  const [pendingUsersContent, setPendingUsersContent] = useState()
  const [acceptedUsersContent, setAcceptedUsersContent] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/stats/pending-users')
      const json = await res.json()
      setPendingUsersContent(json)
    }
    fetchData()
  }, [session])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/stats/accepted-users')
      const json = await res.json()
      setAcceptedUsersContent(json)
    }
    fetchData()
  }, [session])

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading>Site Statistics</Heading>

      <Heading size='md'>Universities by Number of Pending Invitations</Heading>

      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>University Name</Th>
            <Th>Number of Pending Invitations</Th>
          </Tr>
        </Thead>
        <Tbody>

          {pendingUsersContent?.map((row) => (
            <Tr>
              <Td>{row.universityName}</Td>
              <Td>{row.numPending}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <br /> <br />
      <Heading size='md'>Universities and Services by Number of Accepted Invitations</Heading>

      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>University Name</Th>
            <Th>Number of Pending Invitations</Th>
            <Th>Number of Accepted Invitations</Th>
          </Tr>
        </Thead>
        <Tbody>

          {acceptedUsersContent?.map((row) => (
            <Tr>
              <Td>{row.universityName}</Td>
              <Td>{row.serviceName}</Td>
              <Td>{row.numUsers}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Layout>
  )
}
