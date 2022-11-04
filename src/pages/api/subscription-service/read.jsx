import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import endpointWrapper from '../util'

export default async function handler(req, res) {
  const query = 'select * from SubscriptionService'

  return endpointWrapper(req, res, query)
}
