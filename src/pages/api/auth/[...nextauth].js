import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import mysql from 'mysql2/promise'
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: 'dark',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const connection = await mysql.createConnection({
        host: process.env.INSTANCE_HOST, // e.g. '127.0.0.1'
        port: process.env.DB_PORT, // e.g. '3306'
        user: process.env.DB_USER, // e.g. 'my-db-user'
        password: process.env.DB_PASS, // e.g. 'my-db-password'
        database: process.env.DB_NAME, // e.g. 'my-database'
      })

      const checkQuery = 'select * from User where email="' + user.email + '"'

      const [checkRows, checkFields] = await connection.execute(checkQuery)

      if (checkRows.length !== 0) {
        return true
      }

      console.log(user.name + ', ' + user.email)

      const query =
        'insert into User (userName, email) values ("' +
        user.name +
        '", "' +
        user.email +
        '")'

      console.log(query)

      await connection.execute(query)

      // console.log('hee')
      await connection.end()
      return true
    },
    async jwt({ token }) {
      token.userRole = 'admin'
      return token
    },
    async redirect({ url, baseUrl }) {
      return '/home'
    },
  },
}

export default NextAuth(authOptions)
