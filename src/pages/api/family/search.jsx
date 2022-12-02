import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import endpointWrapper from '../util'

export default async function handler(req, res) {
  // const session = await unstable_getServerSession(req, res, authOptions)

  console.log(req.query)
  const query =
    `select f.familyID, us.userName as leaderName, f.accessType, f.serviceName, subq.numMembers, s.maxMembers
  from Family f
  left join SubscriptionService s
  on f.serviceName = s.serviceName
  left join User us
  on f.leaderID = us.userID
  left join University u
  on us.universityID = u.universityID
  left join (
    select fa.familyID, count(*) as numMembers
    from Family fa
    natural join Membership mem
    where mem.memberStatus = 'Accepted'
    group by fa.familyID
  ) subq on subq.familyID = f.familyID
  where lower(us.userName) like '%${req.query.leaderKeyword}%'
  and f.serviceName like '%${req.query.serviceName}%'
  and subq.numMembers < s.maxMembers
  `.replace('/[\r\n]/gm', ' ')

  // console.log(query)

  return endpointWrapper(req, res, query)
}
