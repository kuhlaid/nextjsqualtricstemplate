import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from 'components/layout'
import AccessDenied from 'components/access-denied'

export default function Page () {
  const [ session, loading ] = useSession()
  const [ userArray, setContent ] = useState({})

  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/user/get-list')
      const json = await res.json()
      if (json) { setContent(json) }
    }
    fetchData()
  },[session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display userArray
  return (
    <Layout>
      <h1>Users</h1>
      <p><strong>
        {/* if we have no users from our query */}
        {!userArray.users && <>
            No users
          </>}
        {/* if we have users in our query */}
        {userArray.users && userArray.users.length>0 && <>
            User count: {userArray.users.length}<br/>
            {/* here we loop through the list of users and print them */}
            {userArray.users.map((user) => (
              <span>ID: {user._id}<br/></span>
            ))}
          </>}
      </strong></p>
    </Layout>
  )
}