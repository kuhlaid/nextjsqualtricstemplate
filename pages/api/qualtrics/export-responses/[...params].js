/**
 * This API endpoint initiates a Qualtrics survey response export from an optional start date
 * Test with http://localhost:3000/api/qualtrics/export-responses/[surveyIdHere]/[startDateTimeHere]
 * 
 * For this API endpoint the parameters we will be:
 * Param 0 = Survey ID
 * Param 1 = StartDate (filter)
 *
 * Note: if we have a start date then we want our API body to look like (since we are assuming the startDate a day before and not likely that many responses over one day requiring compression to zip format):
{
    "format": "json",
    "compress": "false",
    "startDate": "2021-03-15T15:23:33Z"
}
 */
// This is a protected API route
import { getSession } from 'next-auth/client'

export default async(req, res) => {
	// get the surveyID and startDate query string parameters
	const { params } = await req.query	// NOTE: we must await the assignment of params from the request query
	const session = await getSession({ req })
	let apiBody = { "format": "json" }

	// if we have a startDate then change the body of the API call
	if (params[1]!=''){
		apiBody = {
			"format": "json",
			"compress": "false",
			"startDate": params[1]
		}
	}

	if (session) {
		// ****** IMPORTANT: wrap your fetch to Qualtrics in a try statement to help prevent errors of headers already set **************
		try {
			const ftch = await fetch(
				process.env.QUALTRICS_SERVER_URL + "/API/v3/surveys/" +
				params[0] + "/export-responses",
				{
				method: "post",
				headers: {
					"Content-type": "application/json",
					"X-API-TOKEN": process.env.QUALTRICS_API_TOKEN,
				},
				body: JSON.stringify(apiBody),
				},
			);
			const data = await ftch.json();
			// if we have a json result returned and everything is OK
			if (data.result && data.meta.httpStatus == "200 - OK") {
				if (data.result.progressId) {
					return res.send({ resJson: data, status: 200 })
				}
			}
			else return res.send({ error: "Something went wrong", status: 400 })
		} catch (error) {
			return res.send({ error: "You made an invalid request", status: 400 })
		}
		
	  } else {
		return res.send({ error: 'You must sign in to view the protected content on this page...', status: 401 })
	  } 
}