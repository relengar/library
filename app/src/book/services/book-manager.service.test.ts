import { updateBookQuery } from './book-manager.service'
import { expect } from 'chai'
import bookModel from '../models/book.model'

describe('Book manager service', () => {
  it('Update book', async () => {
    const newBook = await updateBookQuery(
      new bookModel({
        title: 'title',
        desciption: 'desc'
      }),
      { title: 'new title', description: 'new desc' }
    )
    expect(newBook.get('title')).to.eql('new title')
    expect(newBook.get('description')).to.eql('new desc')
  })
})
