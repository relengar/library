##App

- `npm install`
- `npm start`

###**_stack_**

- **mongoDb** based on the type of the application I presume there won't be too many complicated relations, however vertical relations (such as book meta data) could get complex. I chose mongo specifically because I used it previously and I know a free hosting service (mlab).

- **express** since the output should be a simple REST API, I thought express would be a proper lightweight tool

- **dotenv** since I didn't want to expose env variables

###to add

- there;s missing authentication- depending on the api usage I would use jwt in bearer token (in case of server to server) or http-cookie (for browser). I would probably go with passport.js

- cache - depending on usage - but considering larger dataset Iwould probably want to use redis cache

- tesitng - in case I would like to test all the services I would probably need some stubing/ mocking library like sinon

