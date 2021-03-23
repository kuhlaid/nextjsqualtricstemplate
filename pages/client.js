import Layout from 'components/layout'

// using this to test the MongoDb caching which seems to be working
import { connectToDatabase } from 'util/mongodb'

export default function Page ({isConnected,envVars}) {
  const var1 = JSON.parse(envVars.strSu)
  return (
    <Layout>
      <h1>Client Side Rendering</h1>
      {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
      <p>
        This page uses the <strong>useSession()</strong> React Hook in the <strong>&lt;Header/&gt;</strong> component.- {var1.IncludeSurveys[1]}
      </p>
      <p>
        The <strong>useSession()</strong> React Hook easy to use and allows pages to render very quickly.
      </p>
      <p>
        The advantage of this approach is that session state is shared between pages by using the <strong>Provider</strong> in <strong>_app.js</strong> so
        that navigation between pages using <strong>useSession()</strong> is very fast.
      </p>
      <p>
        The disadvantage of <strong>useSession()</strong> is that it requires client side JavaScript.
      </p>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()
  const envVars = { strSu: process.env.SURVEY_OBJ }
  const isConnected = await client.isConnected()

  return {
    props: { isConnected, envVars },
  }
}
