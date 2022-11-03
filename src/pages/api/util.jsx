import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import mysql from 'mysql2/promise'

export default async function endpointWrapper(req, res, query) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    const connection = await mysql.createConnection({
      host: process.env.INSTANCE_HOST, // e.g. '127.0.0.1'
      port: process.env.DB_PORT, // e.g. '3306'
      user: process.env.DB_USER, // e.g. 'my-db-user'
      password: process.env.DB_PASS, // e.g. 'my-db-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
    })


    const [rows, fields] = await connection.execute(query)
    // + (req.query.id && (' where userId=' + req.query.id))
    // )
    // console.log(JSON.parse(JSON.stringify(rows)))

    await connection.end()
    return res.send(JSON.parse(JSON.stringify(rows)))
  }

  res.send({
    error: 'You must be signed in to view the protected content on this page.',
  })
}

