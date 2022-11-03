import endpointWrapper from '../util'

export default async function handler(req, res) {
  const query = `select * from University`

  return endpointWrapper(req, res, query)
}
