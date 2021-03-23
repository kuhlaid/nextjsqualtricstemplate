/** 
 * This script simply lists the surveys.
 * It also provides a link to take a survey from the app and redirect back to the app once completed (${e://Field/ReturnURL})
 */
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/client";
import Link from 'next/link'
import Layout from "components/layout";
import AccessDenied from "components/access-denied";
import BtnTakeSurvey from "components/qualtrics/btn-take-survey"

// this is our page output
// export default function Page({ envVars }) {
export default function Page({strQurl,strReturnUrl}) {
  const [ session, loading ] = useSession()
  const [ surveyArray, setContent ] = useState({})

  // Fetch our list of surveys
  useEffect(()=>{
    const fetchData = async () => {
      const res = await require("util/app_surveys.json")
      if (res) { setContent(res) }
    }
    fetchData()
  },[session])
 
  // const ph = 'placeholder';
  // const exportResponses = async () => {
  //   const res = await fetch('/api/qualtrics/export-responses')
  //   const json = await res.json()
  //   if (json.content) { ph = json.content }
  // }

 // $strURL = $this->buildCLUrl(SurveyId, ResponseId, 'HhInterestEdit')."&Q_R=".$objE03Qualtrics->ResponseId;	// we will delete the previous responses locally and on Qualtrics once edits are made
//  $queryString = '?Q_Language=EN&Interviewer='.__LOGGED_ONYEN__.'&HouseholdNumber='.E03Ds1341::getStatHouseholdNumber($this->strHouseholdId).'&ReturnURL='.urlencode($this->config['app']['e03']['domain'].$this->config['app']['e03']['subdirectory'].'/router.php?UserMode='.E03Session::GetSession(8).'&AppSource='.$this->config['app']['e03']['app_source'].'&routeIn='.$strRouteIn.'&rid=${e://Field/ResponseID}&sid=${e://Field/SurveyID}&HouseholdId='.$this->strHouseholdId.'&Q_R='.$strEditedResponseId);
//  return ('https://'.$this->config['app']['e03']['qualtrics']['datacenter_id'].'.qualtrics.com/jfe/form/'.$strE03QualtricsId.$queryString);
   

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <Layout>
      <AccessDenied />
    </Layout>;
  } else {
    // If session exists, display content
    return (
      <Layout>
        
        <h2>ToDo - work on getting responses</h2>
        <div>http://localhost:3000/qualtrics/[surveyId]/get-response?AppSource=dev&session=[sessionIdFromQualtrics]&startDate=2021/03/15T16:27:59Z&endDate=2021/03/17T16:27:59Z&rid=[responseId]&sid=[surveyId]</div>
        
        <h1>Qualtrics Survey List</h1>
        <div class="m-3">
          - Build the list of surveys<br/>
          - show button to view the responses for a survey</div>
        {/* if we have no surveys from our query */}
        {!surveyArray.IncludeSurveys && <>
            No surveys
          </>}
        {/* if we have surveys in our query */}
        {surveyArray.IncludeSurveys && surveyArray.IncludeSurveys.length>0 && <>
            Survey count: {surveyArray.IncludeSurveys.length}<br/>
            {/* here we loop through the list of surveys and print them */}
            {surveyArray.IncludeSurveys.map((survey) => (
              <div>
              <Link href={`/qualtrics/${encodeURIComponent(survey)}/list-responses`}
              className="btn btn-primary"
              type="button">Get Survey Responses for
              </Link>
              <BtnTakeSurvey strQurl={`${strQurl}${survey}?Q_Language=EN&ReturnURL=${encodeURIComponent(strReturnUrl+'/qualtrics/'+survey+'/get-response?AppSource=dev&session=${e://Field/SessionID}&startDate=${date://OtherDate/Y%2Fm%2Fd/-1 day}T${date://CurrentTime/MS}Z&endDate=${date://OtherDate/Y%2Fm%2Fd/+1 day}T${date://CurrentTime/MS}Z&rid=${e://Field/ResponseID}&sid=${e://Field/SurveyID}')}`}/>
              </div>
            ))}
          </>}
      </Layout>
    );
  }
}


export async function getServerSideProps() {
	const r = process.env.QUALTRICS_SERVER_URL
  const s = process.env.QUALTRICS_FORM_PATH
  const t = process.env.NEXTAUTH_URL

	return {
		props: { strQurl: r+s, strReturnUrl: t }
	}
}