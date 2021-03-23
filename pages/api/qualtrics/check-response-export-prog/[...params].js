/**
 * This API endpoint checks the progress of a Qualtrics survey response export
 * Test with http://localhost:3000/api/qualtrics/check-response-export-prog/[surveyIdHere]/[progressIdHere]
 * 
 * For this API endpoint the parameters we will be:
 * Param 0 = Survey ID
 * Param 1 = progress ID
 *
 */
// This is a protected API route
import { getSession } from 'next-auth/client'

export default async(req, res) => {
	const { params } = await req.query	// NOTE: we must await the assignment of params from the request query
	const session = await getSession({ req })

	if (session) {
		// ****** IMPORTANT: wrap your fetch to Qualtrics in a try statement to help prevent errors of headers already set **************
		try {
			let intCount=0;
			let fltPercentComplete=0;
			while (true) {
				
				const ftch = await fetch(
					process.env.QUALTRICS_SERVER_URL + "/API/v3/surveys/" +
					params[0] + "/export-responses/" + params[1],
					{
						method: "get",
						headers: {
							"Content-type": "application/json",
							"X-API-TOKEN": process.env.QUALTRICS_API_TOKEN,
						},
					},
				);
			  
				const data = await ftch.json();
				// if we have a json result returned and everything is OK
				if (data.result && data.meta.httpStatus == "200 - OK") {
					fltPercentComplete = data.result.percentComplete;
					if (data.result.percentComplete != 100) {
						intCount++;
						// only cycle 10 times before we stop
						if (intCount > 10) {
							// @todo - should probably set an error message here to let the user know they need to try again
							return res.send({ error: "For some reason Qualtrics is being slow today and is not ready after 10 attempts", status: 400 })
						} 
					} else {
						if (data.result.fileId) {
							return res.send({ resJson: data, status: 200, intCount:intCount })
						}
						return res.send({ error: "For some reason the fileId was not returned", status: 400 })
					}
				}
			}
			
		} catch (error) {
			return res.send({ error: "You made an invalid request to check the response export progress", status: 400 })
		}
		
	  } else {
		return res.send({ error: 'You must sign in to view the protected content on this page...', status: 401 })
	  } 
}