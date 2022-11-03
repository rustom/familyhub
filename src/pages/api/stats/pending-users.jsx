import endpointWrapper from '../util'

export default async function handler(req, res) {
    const query = `select un.universityName, count(*) as numPending
    from University un
    natural join User us
    join Membership m
    on m.memberID = us.userID
    where m.memberStatus = "Pending"
    group by un.universityName
    order by numPending desc`

    return endpointWrapper(req, res, query)
}
