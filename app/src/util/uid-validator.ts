import { Types } from 'mongoose'
import { Response, Request, NextFunction } from 'express'

export function isValidMongoId (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.params.id && !Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`${req.params.id} is not a vlaid Object ID`)
  }
  next()
}
