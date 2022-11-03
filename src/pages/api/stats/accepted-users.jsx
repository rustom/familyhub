import endpointWrapper from '../util'

export default async function handler(req, res) {
  const query = `select un.universityName, ss.serviceName, count(*) as numUsers
    from User us
    join Membership m
        on m.memberID = us.userID
    natural join Family f
    natural join SubscriptionService ss
    natural join University un
    where m.memberStatus = "Accepted"
    group by un.universityID, ss.serviceName
    order by un.universityName asc, numUsers desc`

  return endpointWrapper(req, res, query)
}
