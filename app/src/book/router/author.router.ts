import { Router } from 'express'
import {
  getAuthors,
  getAuthorDetails,
  deleteAuthor
} from '../services/author-manager.service'
import { asyncHandler } from '../../util/async-handler'
import { isValidMongoId } from '../..//util/uid-validator'

export const router = Router()
const prefix = '/authors'

router.get(prefix, (req, res, next) =>
  asyncHandler(req, res, next, async () => {
    const author = await getAuthors(req.query)
    res.send(author)
  })
)

router.get(`${prefix}/:id`, isValidMongoId, (req, res, next) =>
  asyncHandler(req, res, next, async () => {
    const author = await getAuthorDetails(req.params.id)
    if (!author) {
      return res
        .status(404)
        .send(`Could not find author with id ${req.params.id}`)
    }

    res.send(author)
  })
)

router.delete(`${prefix}/:id`, isValidMongoId, (req, res, next) =>
  asyncHandler(req, res, next, async () => {
    const resp = await deleteAuthor(req.params.id)
    if (resp.deletedCount === 0) {
      return res
        .status(404)
        .send(`Could not find author with id ${req.params.id}`)
    }
    return res.send('Deleted')
  })
)
