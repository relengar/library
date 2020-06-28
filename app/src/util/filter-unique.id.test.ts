import { expect } from 'chai'
import { filterUniqueId } from './filter-unique-id'
import { Types } from 'mongoose'

const duplicateObjects: { _id: string | Types.ObjectId }[] = [
  { _id: '5ef72b7c8ad65edc8d2d714c' },
  { _id: '5ef72b7c8ad65edc8d2d714a' },
  { _id: '5ef72b7c8ad65edc8d2d714c' },
  { _id: '5ef72b7c8ad65edc8d2d714a' },
  { _id: '5ef72b7c8ad65edc8d2d714b' },
  { _id: '5ef72b7c8ad65edc8d2d714c' }
]
const uniqueObjects: { _id: string | Types.ObjectId }[] = [
  { _id: '5ef72b7c8ad65edc8d2d714a' },
  { _id: '5ef72b7c8ad65edc8d2d714b' },
  { _id: '5ef72b7c8ad65edc8d2d714c' }
].sort((a, b) => (a._id > b._id ? 1 : -1))

describe('Util - filterUniqueId', () => {
  it('Should filter unique objects from array by mongo _id property', () => {
    const value = duplicateObjects
      .filter(filterUniqueId)
      .sort((a, b) => (a._id > b._id ? 1 : -1))
    expect(value).to.eql(uniqueObjects)
  })
})
