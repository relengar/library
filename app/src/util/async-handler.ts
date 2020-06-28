import { Request, Response, NextFunction } from 'express'

export async function asyncHandler<T> (
  req: Request,
  res: Response,
  next: NextFunction,
  cb: () => Promise<T>
) {
  cb().catch(err => next(err))
}
