import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import endpointWrapper from '../util'

export default async function handler(req, res) {
  // const session = await unstable_getServerSession(req, res, authOptions)

  const inputData = JSON.parse(req.body)
console.log(inputData)

  const query = `insert into Membership values (${inputData.memberID}, ${inputData.familyID}, 'Accepted')
  `.replace('/[\r\n]/gm', ' ')


  return endpointWrapper(req, res, query)
}
