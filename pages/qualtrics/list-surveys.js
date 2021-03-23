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
export default function Page({strQurl,strReturnUrl, sa}) {
  const [ session, loading ] = useSession()
  const surveyArray = JSON.parse(sa)

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
        
        <h1>Qualtrics Survey List</h1>
        <div class="m-3">
          - Build the list of surveys from the environment variable<br/>
          - show button to view the responses for a survey</div>
        {/* if we have no surveys from our query */}
        {!surveyArray.IncludeSurveys && <>
            No surveys {surveyArray}
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
  const sa = process.env.SURVEY_OBJ
	return {
		props: { strQurl: r+s, strReturnUrl: t, sa: sa }
	}
}
