# About
This is a Next.js template for building an app that uses Qualtrics as the data collection tool and then this app collects those
responses and saves them to a database.

# Setup
- Rename the app_surveys.json.example to app_surveys.json and include any Qualtrics survey IDs you want to include in this app
- Rename the .env.example to .env and change the envrionment variables to match your needs
# Login
Using social auth

# Todo
- need to save the recent response completed to the database and flag it for pulling from Qualtrics until it has been received so we know what responses are outstanding from Qualtrics

# Issues
- the date/time coming from the Qualtrics API is UTC and cannot be specified in the API request (which is unfortunate); this app assumes EST time zone so if you use other time zones then keep that in mind

# Think about
- need to write code to autogenerate the db.js code to include the qualtrics surveys, the survey data schemas using a json file that lists the surveys to include in the app
- get schema to MongoDb setup and create initial seeding configuration since I need to perform more database transactions on sensitive user actions and save that to a user session in the database (see seeding example https://github.com/mattcarlotta/next-issg-example/tree/ef57fc830643935407b530bfe64b7139fa41539b/api/database/seedDB)
- look into using GraphQL to make queries to the data

# Db
This app connects to MongoDb Atlas server for testing.

# Zip file parsing
Installing node-stream-zip to parse the zip file data from Qualtrics

# Things to note
### Client side stuff
The useState() function pushes data to the client side, so be careful what you are saving to the state if you do not want the client to see the data (eg. secret tokens, etc.). Also the page/component properties are also pushed to the client. This can make archietecture of the client side tricky.

### Simplify import
Adding the jsconfig.json file allows the import statements to assume you are starting at the root, simplifying things and removing the need to do the '../' thing to determine root relative to the current file.

### Reuse db connection
I tried several things to try and reuse the mongodb connection. The react redux store does not work because you can only access the store contents from a component. Switched to using the standard MongoDb module and setting a global variable that sets the connection for reuse; this seems to work fine (with less connections uses than Mongoose)

# Last Updated
March 10, 2021