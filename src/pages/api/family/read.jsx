import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import mysql from 'mysql2/promise'
import endpointWrapper from '../util'

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)

  const email = session.user.email

  const query =
    `select * from User us 
    left join Membership m on us.userID = m.memberID 
    left join Family f on m.familyID=f.familyID 
    left join SubscriptionService s on f.serviceName=s.serviceName
    left join (
        select fa.familyID, count(*) as numMembers
        from Family fa
        natural join Membership mem
        where mem.memberStatus = 'Accepted'
        group by fa.familyID
      ) subq on subq.familyID = f.familyID
    where us.email="${email}"`.replace('/[\r\n]/gm', ' ')


  return endpointWrapper(req, res, query)
}

// left join Membership m on m.memberID = User.userID left join Family f on f.familyID = m.familyID 