import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import mysql from 'mysql2/promise'
import endpointWrapper from '../util'

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)

  const email = session.user.email

  const query =
    'select * from User left join University on User.universityID = University.universityID ' +
    (session.user.email && 'where email="' + email + '"')

  return endpointWrapper(req, res, query)
}
