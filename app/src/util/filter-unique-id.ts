import { Types } from 'mongoose'

export function filterUniqueId<T extends { _id: string | Types.ObjectId }> (
  item: T,
  index: number,
  all: T[]
) {
  return (
    index === all.findIndex(val => val._id.toString() === item._id.toString())
  )
}
