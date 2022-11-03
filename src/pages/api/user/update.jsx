// import { unstable_getServerSession } from 'next-auth/next'
// import { authOptions } from '../auth/[...nextauth]'
// import endpointWrapper from '../util'

// export default async function handler(req, res) {
//   const session = await unstable_getServerSession(req, res, authOptions)

//   const email = session.user.email


//   if (email === '') {
//     return
//   }


//   const query = 'update User set ' + (email && 'where email="' + email + '"')

//   return endpointWrapper(req, res, query)
// }


// INCOMPLETE