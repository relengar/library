import { Router } from 'express'
import {
  getBook,
  createBook,
  getBookById,
  getBooksByFilter,
  updateBook,
  deleteBook
} from '../services/book-manager.service'
import { IBookDoc } from '../models/book.model'
import { isValidMongoId } from '../../util/uid-validator'
import { asyncHandler } from '../../util/async-handler'
export const router = Router()

const prefix = '/books'

router.get(prefix, async (req, res, next) =>
  asyncHandler(req, res, next, async () => {
    const books = await getBooksByFilter(req.query, true)
    return res.send(books)
  })
)

router.get(`${prefix}/:id`, isValidMongoId, (req, res, next) =>
  asyncHandler(req, res, next, async () => {
    const book = await getBookById(req.params.id)
    if (!book) {
      return res
        .status(404)
        .send(`Could not find book with id ${req.params.id}`)
    }
    return res.send(book)
  })
)

router.post(prefix, async (req, res, next) =>
  asyncHandler(req, res, next, async () => {
    const existingBook = await getBook(req.body.isbn)
    if (existingBook) {
      return res
        .status(409)
        .send(`Book ith isbn ${req.body.isbn} already exists`)
    }
    const resp = await createBook(req.body)
    return res.status(201).send(resp)
  })
)

router.patch(`${prefix}/:id`, isValidMongoId, (req, res, next) =>
  asyncHandler(req, res, next, async () => {
    const book = await getBookById(req.params.id)
    if (!book) {
      return res
        .status(404)
        .send(`Could not find a book with id ${req.params.id}`)
    }
    const resp = await updateBook(
      book as IBookDoc,
      req.body,
      req.query.deleteAuthors === 'true'
    )
    return res.send(resp)
  })
)

router.delete(`${prefix}/:id`, isValidMongoId, (req, res, next) =>
  asyncHandler(req, res, next, async () => {
    const resp = await deleteBook(req.params.id)
    if (resp.deletedCount === 0) {
      return res
        .status(404)
        .send(`Could not find a book with id ${req.params.id}`)
    }
    return res.send('Deleted')
  })
)
