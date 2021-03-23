// This is an example of to protect an API route
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    res.send({ content: 'This is protected content. You can access this content because you are signed in...'+process.env.QUALTRICS_SERVER_URL })
  } else {
    res.send({ error: 'You must be sign in to view the protected content on this page...' })
  }
}