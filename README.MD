## Books

Needs to have mongo db setup, provide connection string in .env
Required node version 14.x

- `npm install`
- `npm start:dev`

### **_stack_**

- **mongoDb** I thought to be appropriate since the books could evolve to have dynami tags, multiple level of categories etc. I chose mongo specifically mainly for the easy (and free) deployment

- **express** since the output should be a simple REST API, I thought express would be a proper lightweight tool

- **dotenv** since I didn't want to expose env variables

### to add

- there's missing authentication - depending on the api usage I would use jwt in bearer token (in case of server to server) or http-cookie (for browser). I would probably go with passport.js

- cache - depending on usage/size - but considering larger dataset I would probably want to use redis cache

- tesitng - in case I would like to test all the services I would probably need some stubing/ mocking library like sinon

- logging - perhaps some better sttructured logs would be suitabe that could provide production debugging with context reference. Like [debug](https://www.npmjs.com/package/debug)
