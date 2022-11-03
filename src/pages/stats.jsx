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
      <h1>Site Statistics</h1>

      <h2>Universities by Number of Pending Invitations</h2>

      <Table>
        <tr>
          <th>University Name</th>
          <th>Number of Pending Invitations</th>
        </tr>

        {pendingUsersContent?.map((row) => (
          <tr>
            <td>{row.universityName}</td>
            <td>{row.numPending}</td>
          </tr>
        ))}
      </Table>

      <h2>Universities and Services by Number of Accepted Invitations</h2>

      <Table>
        <tr>
          <th>University Name</th>
          <th>Number of Pending Invitations</th>
          <th>Number of Accepted Invitations</th>
        </tr>

        {acceptedUsersContent?.map((row) => (
          <tr>
            <td>{row.universityName}</td>
            <td>{row.serviceName}</td>
            <td>{row.numUsers}</td>
          </tr>
        ))}
      </Table>
    </Layout>
  )
}
