// this component simply builds a link to start a Qualtrics survey
export default function BtnTakeSurvey({strQurl}) {
	return (
		<a href={strQurl} rel="noopener noreferrer" className="btn btn-primary m-2">Take Survey</a>
	);
}
