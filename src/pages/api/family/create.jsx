import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import mysql from 'mysql2/promise'
import endpointWrapper from '../util'

export default async function handler(req, res) {
  const inputData = JSON.parse(req.body)

  const query = `
  insert into Family (leaderID, accessType, serviceName) 
  values (${inputData.leaderID}, '${inputData.accessType}', '${inputData.serviceName}')
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
