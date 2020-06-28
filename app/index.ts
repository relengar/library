import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import swagger from 'swagger-ui-express'
import swaggerOptions from './swagger.json'
import * as dotenv from 'dotenv'
import { connectDB } from './src/db'
import book from './src/book'

dotenv.config()
const PORT = process.env.PORT || 3000
swaggerOptions.host = `${process.env.HOST || swaggerOptions.host}:${PORT}`

const app = express()
app.use(bodyParser.json())
app.use(morgan('tiny'))
book(app)

app.use('/', swagger.serve, swagger.setup(swaggerOptions))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).send(err.message)
  next()
})

connectDB().then(DBmsg => {
  console.log(DBmsg)
  app.listen(PORT, () => console.log(`Listening on port ${process.env.PORT}`))
})
