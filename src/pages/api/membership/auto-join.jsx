import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import mysql from 'mysql2/promise'
import endpointWrapper from '../util'

export default async function handler(req, res) {
  const inputData = JSON.parse(req.body)

  const query = `
  delimiter $$
  set transaction isolation level repeatable read;
  start transaction;

  create temporary table tempGroups (
    select f.FamilyID, f.accessType, f.serviceName
    from Family f
    left join SubscriptionService s
      on f.serviceName = s.serviceName
    left join User us
      on f.leaderID = us.userID
    left join University u
      on us.universityID = u.universityID
    left join (
      select fa.familyID, if(count(*) < 0, 0, count(*)) as numMembers
      from Family fa
      natural join Membership mem
      where mem.memberStatus = 'Accepted'
      group by fa.familyID
    ) subq on subq.familyID = f.familyID
    where f.serviceName like '%${inputData.serviceName}%'
    and subq.numMembers < s.maxMembers
  );

  set @family := (select familyID
    from Family
    natural join (select familyID from tempGroups) temp
    where accessType = 'Open'
    limit 1);

  insert into Membership values (${inputData.memberID}, @family, 'Accepted');

  drop table tempGroups;
  
  commit;
  $$

  delimiter ;
  `.replace(/(\r\n|\n|\r)/gm, '')

  // The below membership creation query has been replaced by our SQL trigger, which was created in the GCP cloud console
  // delimiter $$
  // create trigger createFamily
  // after insert on Family
  // for each row
  // begin
  //     if exists (select * from Family f where f.leaderID=new.leaderID and f.serviceName=new.serviceName) then
  //     insert into Membership (memberID, familyID, memberStatus)
  //     values (new.leaderID, (select familyID from Family q where q.leaderID=new.leaderID and q.serviceName=new.serviceName limit 1), 'Accepted');
  //     end if;
  // end $$
  // delimiter;

  // // Buggy when user creates multiple of the same type of family
  // const membershipQuery = `insert into Membership (memberID, familyID, memberStatus)
  // values (${inputData.leaderID}, (select familyID from Family where leaderID=${inputData.leaderID} and serviceName='${inputData.serviceName}' limit 1), 'Accepted')
  // `.replace(/(\r\n|\n|\r)/gm, "")

  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const connection = await mysql.createConnection({
      host: process.env.INSTANCE_HOST, // e.g. '127.0.0.1'
      port: process.env.DB_PORT, // e.g. '3306'
      user: process.env.DB_USER, // e.g. 'my-db-user'
      password: process.env.DB_PASS, // e.g. 'my-db-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
    })

    await connection.execute(query)
    await connection.execute(membershipQuery)

    await connection.end()
    // return res.send(JSON.parse(JSON.stringify(rows)))
  }

  return {}
}
