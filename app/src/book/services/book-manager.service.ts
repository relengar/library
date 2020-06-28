import bookModel from '../models/book.model'
import { IBook, IBookDoc } from '../models/book.model'
import { addAuthor } from './author-manager.service'
import { Types, MongooseFilterQuery } from 'mongoose'
import { filterUniqueId } from '../../util/filter-unique-id'
import { IAuthorDoc, IAuthor } from '../models/author.model'

export async function getBookById (id: string) {
  return bookModel
    .findById(Types.ObjectId(id))
    .populate('authors', ['firstName', 'lastName'])
}

export async function getBook (
  isbn: string,
  include = false
): Promise<IBookDoc | null> {
  const query = bookModel.findOne({ isbn })
  if (include) {
    query.populate('authors', ['firstName', 'lastName'])
  }
  return query
}

export async function createBook (data: IBook): Promise<IBookDoc> {
  const authors = await Promise.all<IAuthorDoc>(
    data.authors.map((a: IAuthor) => addAuthor(a))
  )

  return updateBook(new bookModel(), data)
}

export function getBooksByFilter (
  filter: MongooseFilterQuery<Partial<IBook>>,
  include = false
) {
  const book = bookModel
    .find({
      ...filter,
      title: new RegExp(`${filter.title ?? ''}`, 'i'),
      description: new RegExp(`${filter.description ?? ''}`, 'i')
    })
    .select('-__v')

  include
    ? book.populate('authors', ['firstName', 'lastName'])
    : book.select('-authors')
  return book
}

export async function updateBookQuery (
  book: IBookDoc,
  data: Partial<IBook>,
  deleteAuthors = false
): Promise<IBookDoc> {
  const authorsInput = data.authors
    ? await Promise.all(data.authors.map((a: IAuthor) => addAuthor(a)))
    : []
  Object.entries(data)
    .filter(([key]) => key !== 'authors')
    .forEach(([key, val]) => {
      book.set(key, val)
    })

  const authors = [...book.get('authors'), ...authorsInput].filter(
    filterUniqueId
  )
  book.set('authors', !deleteAuthors ? authors : authorsInput)

  return book
}

export async function updateBook (
  book: IBookDoc,
  data: Partial<IBook>,
  deleteAuthors = false
): Promise<IBookDoc> {
  const newBook = await updateBookQuery(book, data, deleteAuthors)
  return await newBook.save()
}

export async function deleteBook (id: string) {
  return bookModel.deleteOne({ _id: Types.ObjectId(id) })
}
