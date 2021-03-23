/** This page is used to get the recently taken survey response 
 * and save it to the database.
 * 
 * Qualtrics API reference
 * https://api.qualtrics.com/api-reference/reference/responseImportsExports.json/paths/~1surveys~1%7BsurveyId%7D~1export-responses/post
*/
import Layout from "components/layout";
import { useSession } from "next-auth/client";
import AccessDenied from "components/access-denied";
import { useRouter } from 'next/router'
import useSWR from 'swr'

//const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Page() {
  const [ session, loading ] = useSession()

  const router = useRouter()
  const { surveyid, rid, startDate } = router.query // NOTE: surveyid is coming from the API path and not query string
  let strStartDate = String(startDate)  // we only care about the startDate (a day earlier than the submission date) to use in the API request
  strStartDate = strStartDate.replace(/\//g,"-")

  const { data: exportProgress, error } = useSWR('/api/qualtrics/export-responses/'+surveyid)
  // see Dependent Fetching at https://www.npmjs.com/package/swr
  const { data: cp, error2 } = useSWR(() => '/api/qualtrics/check-response-export-prog/'+surveyid+'/'+exportProgress.resJson.result.progressId)
  const { data: rj, error3 } = useSWR(() => '/api/qualtrics/get-response-export-file/'+surveyid+'/'+cp.resJson.result.fileId)
  if (error) return <Layout><div>Failed to load</div></Layout>
  if (!exportProgress) return <Layout><div>Making a request to export responses...</div></Layout>


	// If no session exists, display access denied message
  if (!session) {
    return <Layout>
      <AccessDenied />
    </Layout>;
  } else {
    // here we need to post to an API to save the response data for the selected response
    // post to the export-responses API and include query string variables to let the API know we want to only request the response data for a selected response (unzipped)
    // when we get information back from the API we can update the UI and make the next API call to get the progress of the request
    // get the response data from Qualtrics then save to the database



    


    // If session exists, display content
    return (
      <Layout>
        <h1>Read the instructions on making API calls (line21)</h1>
        <div>ProgressId: {JSON.stringify(exportProgress)} {JSON.stringify('/api/qualtrics/check-response-export-prog/'+surveyid+'/'+exportProgress.resJson.result.progressId)}</div>
        <div>First error: {error}</div>
        <div>FileID: {JSON.stringify(cp)}</div>
        <div>Second error: {error2}</div>
        <div>Response data: {JSON.stringify(rj)}</div>
        <div>This pulls the latest Qualtrics response for the SurveyId={surveyid} and ResponseID={rid} and startDate={strStartDate}</div>
      </Layout>
    );
  }
}
