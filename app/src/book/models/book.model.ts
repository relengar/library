import { Schema, model, Document } from 'mongoose'
import { IAuthor } from './author.model'

// Each book has a title, description and 1-n authors

export interface IBook {
  description: string
  isbn: string
  title: string
  authors: IAuthor[]
}

export interface IBookDoc extends Document {}

const bookSchema = new Schema({
  description: { type: String },
  isbn: { type: String, unique: true },
  title: { type: String },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
      unique: false
    }
  ]
})

export default model<IBookDoc>('Book', bookSchema)
