/**
 * This API endpoint pulls the Qualtrics survey response export data
 * Test with http://localhost:3000/api/qualtrics/get-response-export-file/[surveyIdHere]/[fileId]
 * 
 * For this API endpoint the parameters we will be:
 * Param 0 = Survey ID
 * Param 1 = FileId
 * Param 2 = blnCompression (if we should be expecting compressed data)
 *
 */
// This is a protected API route
import { getSession } from 'next-auth/client'

export default async(req, res) => {
	// get the surveyID and fileId query string parameters
	const { params } = await req.query	// NOTE: we must await the assignment of params from the request query
	const session = await getSession({ req })

	if (session) {
		// ****** IMPORTANT: wrap your fetch to Qualtrics in a try statement to help prevent errors of headers already set **************
		try {

			const ftch = await fetch(
				process.env.QUALTRICS_SERVER_URL+"/API/v3/surveys/"+
				params[0]+"/export-responses/"+params[1]+"/file", {
				method: 'get',
				headers: {
				  "X-API-TOKEN": process.env.QUALTRICS_API_TOKEN
				}
			  })
			//   // we are really trying to download JSON raw without zip compression
			//   const resBlob= await res.blob()
			//   //console.log(resBlob.type);
			//   const resBufferArray = await resBlob.arrayBuffer();
			//   //console.log(resBufferArray);
			//   const resBuffer = Buffer.from(resBufferArray);  // this is important for working with the zip file data




		
			const data = await ftch.json();
			// if we have a json result returned and everything is OK
			if (data.responses) {
				return res.send({ resJson: data, status: 200 })
			}
			return res.send({ error: "Some issue occurred with "+JSON.stringify(data), status: 400 })
		} catch (error) {
			return res.send({ error: "You made an invalid request", status: 400 })
		}
		
	  } else {
		return res.send({ error: 'You must sign in to view the protected content on this page...', status: 401 })
	  } 
}