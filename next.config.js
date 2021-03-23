module.exports = {
	serverRuntimeConfig: {}
}

// module.exports = {
//   serverRuntimeConfig: {
//     databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost/taskmanager',
//     baseUrl: process.env.BASE_URL || 'http://localhost:3000',
//     qualtrics_server_url: process.env.QUALTRICS_SERVER_URL
//   },
//   publicRuntimeConfig: {},
//   async rewrites() {
//       return [
//         { source: '/backend/:path*', destination: 'https://example.com/:path*' }
//       ]
//   }
// };
