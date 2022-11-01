import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import mysql from 'mysql2/promise'

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    console.log('hiiiii')
    const connection = await mysql.createConnection({
      host: process.env.INSTANCE_HOST, // e.g. '127.0.0.1'
      port: process.env.DB_PORT, // e.g. '3306'
      user: process.env.DB_USER, // e.g. 'my-db-user'
      password: process.env.DB_PASS, // e.g. 'my-db-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
    })

    console.log('req\n\n\n' + req);

    const [rows, fields] = await connection.execute('SELECT * FROM University')
    console.log(JSON.parse(JSON.stringify(rows)))

    console.log('hee')
    return res.send(JSON.parse(JSON.stringify(rows)))
    await connection.end()
  }

  res.send({
    error: 'You must be signed in to view the protected content on this page.',
  })
}
