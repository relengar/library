import authorModel, { IAuthor, IAuthorDoc } from '../models/author.model'
import { getBooksByFilter } from './book-manager.service'
import { Types } from 'mongoose'

export async function addAuthor (data: IAuthor): Promise<IAuthorDoc> {
  return authorModel.findOneAndUpdate(data, data, { upsert: true, new: true })
}

export async function getAuthors (filter: Partial<IAuthor>) {
  const authors = await authorModel
    .find({
      ...filter,
      firstName: new RegExp(`${filter.firstName ?? ''}`, 'i'),
      lastName: new RegExp(`${filter.lastName ?? ''}`, 'i')
    })
    .select('-__v')
    .lean()

  return authors
}

export async function getAuthorDetails (id: string) {
  const author = await authorModel
    .findById(Types.ObjectId(id))
    .select('-__v')
    .lean()
  if (!author) {
    return null
  }
  const books = await getBooksByFilter({
    authors: author._id
  })

  return { ...author, books }
}

export async function deleteAuthor (id: string) {
  return authorModel.deleteOne({ _id: Types.ObjectId(id) })
}
