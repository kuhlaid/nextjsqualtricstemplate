import Header from 'components/header'
import Footer from 'components/footer'

export default function Layout ({children}) {
  return (
    <div class="container">
      <Header/>
      {/* <Sidebar initialProjects={projects} /> */}
      {/* <main> */}
        {children}
      {/* </main> */}
      <Footer/>
    </div>
  )
 }

//   export async function getServerSideProps(context) {
//     // get user session
//     const session = await getSession(context);
//     // if there's no session - redirect to login
//     if (!session?.user) {
//       return {
//         redirect: {
//           destination: '/auth/email',
//           permanent: false,
//         },
//       };
//     }
  
//     // get user projects
//     const userProjects = await getUserProjects(session.user);
//     // Convert mongoose ObjectIDs to strings
//     // because Next.js doesn't understand you can serialize
//     // (for some reason)
//     const projects = userProjects.map((project) => {
//       const { __v, _id, user, ...obj } = project;
//       return { ...obj, _id: String(_id), user: String(user) };
//     });
  
//     return {
//       props: { projects, session }, // will be passed to the page component as props
//     }
// }