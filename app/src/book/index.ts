import { router as book } from './router/book.router'
import { router as author } from './router/author.router'
import { Express } from 'express'

export default function init (app: Express) {
  app.use(book)
  app.use(author)
}
