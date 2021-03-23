/**
 * This API endpoint to get the list of Qualtrics surveys for the app
 */
// This is a protected API route
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })

	if (session) {
		const surv = await require("util/app_surveys.json")
		if (surv) {
			res.send({ data: surv, status: 200 })
		}
		res.send({ error: 'You made an invalid request', status: 400 })
	  } else {
		res.send({ error: 'You must sign in to view the protected content on this page...', status: 401 })
	  } 
}