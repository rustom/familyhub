import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import endpointWrapper from '../util'

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)

  const inputData = JSON.parse(req.body)

  const query = `update User set userName="${inputData.userName}", universityID=(select u.universityID from University u where u.universityName="${inputData.universityName}") where email="${session.user.email}"`

  return endpointWrapper(req, res, query)
}

// INCOMPLETE
