import { Schema, model, Document } from 'mongoose'
import { IBook } from './book.model'

export interface IAuthor {
  firstName: string
  lastName: string
}

export interface IAuthorDoc extends Document {}

const authorSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String }
})

const authorModel = model<IAuthorDoc>('Author', authorSchema)
export default authorModel
