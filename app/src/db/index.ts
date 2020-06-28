import { connection, connect, set } from 'mongoose'

export function connectDB (): Promise<string> {
  set('useFindAndModify', false)
  return new Promise(resolve => {
    connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    connection.once('open', () => resolve('Database connected'))
  })
}
